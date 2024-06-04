import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { Wallet } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";
import Modal from "../../components/modal/index";
import Loading from "../../components/loading";
import SaveButton from "../../components/button/saveButton";
import GridCardDetails from "../../components/gridCard/gridCardDetails";
import GridCardTop from "../../components/gridCard/gridCardTop";

function Index({ stock }) {

    const [quoteFinancialData, setQuoteFinancialData] = useState({});
    const [quoteDefaultKeyStatistics, setQuoteDefaultKeyStatistics] = useState({});
    const [quoteSummaryProfile, setQuoteSummaryProfile] = useState({});
    const [quoteIncomeStatementHistory, setQuoteIncomeStatementHistory] = useState({});
    const [quoteBalanceSheetHistory, setQuoteBalanceSheetHistory] = useState({});
    const [quoteValueChartData, setQuoteValueChartData] = useState([]);
    const [dividendData, setDividendData] = useState([]);
    const [openToModal, setOpenToModal] = useState(false);
    const [disabledLoading, setDisableLoading] = useState(false)

    async function getQuoteAllStatusByName() {
        const resultFinancialData = await investmentsServices.getQuoteFinancialDataByName(stock, null);
        const resultDefaultKeyStatistics = await investmentsServices.getQuoteDefaultKeyStatisticsByName(stock, null);
        const resultSummaryProfile = await investmentsServices.getQuoteSummaryProfileByName(stock, null);
        const resultIncomeStatementHistory = await investmentsServices.getQuoteIncomeStatementHistoryByName(stock, null);
        const resultBalanceSheetHistory = await investmentsServices.getQuoteBalanceSheetHistoryByName(stock, null);

        const listIncomeStatementHistory = resultIncomeStatementHistory?.incomeStatementHistory?.incomeStatementHistory;
        const listBalanceSheetHistory = resultBalanceSheetHistory?.balanceSheetHistory?.balanceSheetStatements;

        const listDividend = resultDefaultKeyStatistics?.dividendsData?.cashDividends;
        const dividendsPerYear = [];


        listDividend.forEach(dividend => {
            const year = new Date(dividend.paymentDate).getFullYear();
            let yearExisting = dividendsPerYear.find(item => item.year === year);
            if (!yearExisting) {
                yearExisting = { year: year, total: 0 };
                dividendsPerYear.push(yearExisting);
            }
            yearExisting.total += dividend.rate;
        });

        dividendsPerYear.forEach(dividend => {
            dividend.total = parseFloat(dividend.total.toFixed(2));
        });

        setDividendData(dividendsPerYear.reverse());
        resultFinancialData?.historicalDataPrice.map((historicalDataPrice) => {
            historicalDataPrice.date = format(new Date(historicalDataPrice.date * 1000), 'dd/MM/yyyy');
        });
        
        setQuoteFinancialData(resultFinancialData);
        setQuoteDefaultKeyStatistics(resultDefaultKeyStatistics);
        setQuoteValueChartData(resultFinancialData?.historicalDataPrice);
        setQuoteSummaryProfile(resultSummaryProfile?.summaryProfile);
        
        if(listIncomeStatementHistory?.length > 0){
            setQuoteIncomeStatementHistory(listIncomeStatementHistory[0]);
        }

        if(listBalanceSheetHistory?.length > 0){
            setQuoteBalanceSheetHistory(listBalanceSheetHistory[0]);
        }
        setDisableLoading(true);
    }

    useEffect(() => {
        getQuoteAllStatusByName();
    }, []);


    return (
        <>
            <Loading disable={disabledLoading}/>
            <Modal isOpen={openToModal} setOpenToModal={setOpenToModal} stock={stock} quoteValue={quoteFinancialData?.financialData?.currentPrice}/>
            <nav className="bg-gray-900 border-gray-800 rounded-lg border-4 mb-4">
                <div className="max-w-screen-xl flex items-center mx-auto p-4">
                    <img src={quoteFinancialData?.logourl} alt={quoteFinancialData?.longName} className="h-16 w-16 rounded-md" />
                    <div className="ml-2 flex-row items-center space-x-3">
                        <p className=" text-2xl font-extrabold text-white">{stock}</p>
                        <p className="text-white ">{quoteFinancialData?.longName}</p>
                    </div>
                    <button onClick={() => setOpenToModal(!openToModal)} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 ml-auto rounded-lg  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                        <Wallet />
                    </button>
                </div>
            </nav>
            
            <div className="w-full h-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                <GridCardTop text="Cotação" value={`R$ ${quoteFinancialData?.financialData?.currentPrice}`}/>
                <GridCardTop text="Variação (dia)" value={`R$ ${parseFloat(quoteFinancialData?.regularMarketChange?.toFixed(2))} (${quoteFinancialData?.regularMarketChangePercent?.toFixed(2)}%)`}/>
                <GridCardTop text="P/L" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.forwardPE?.toFixed(2)}/>
                <GridCardTop text="P/VP" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.priceToBook?.toFixed(2)}/>
                <GridCardTop text="DY" value="R$ 1200,00"/>
            </div>
            <div className="flex-row justify-center bg-white mt-24 rounded-lg">
                <p className="text-2xl m-4 mt-8">Cotação</p>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={quoteValueChartData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area dataKey="close" stroke="#0db7ed" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-14 bg-white rounded-lg">
                <p className="font-sans text-2xl ml-4 mb-2">Indicadores</p>

                <div className="grid grid-cols-4 gap-4 bg-white rounded-lg">
                    <GridCardDetails text="P/L" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.forwardPE?.toFixed(2)}/>
                    <GridCardDetails text="P/RECEITA (PSR)" value={(quoteFinancialData?.financialData?.currentPrice / quoteFinancialData?.financialData?.revenuePerShare).toFixed(2)}/>
                    <GridCardDetails text="P/VP" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.priceToBook?.toFixed(2)}/>
                    <GridCardDetails text="MARGEM LÍQUIDA" value={`${(quoteDefaultKeyStatistics?.defaultKeyStatistics?.profitMargins * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="MARGEM BRUTA" value={`${(quoteFinancialData?.financialData?.grossMargins * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="MARGEM EBITDA" value={`${(quoteFinancialData?.financialData?.ebitdaMargins * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="MARGEM EBIT" value={`${((quoteIncomeStatementHistory?.ebit / quoteIncomeStatementHistory?.totalRevenue) * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="EV/EBITDA" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.enterpriseToEbitda?.toFixed(2)}/>
                    <GridCardDetails text="EV/EBIT" value={(quoteDefaultKeyStatistics?.defaultKeyStatistics?.enterpriseValue / quoteIncomeStatementHistory?.ebit).toFixed(2)}/>
                    <GridCardDetails text="VPA" value={quoteDefaultKeyStatistics?.defaultKeyStatistics?.bookValue.toString().split('.')[1]?.length > 2 ? (quoteDefaultKeyStatistics?.defaultKeyStatistics?.bookValue).toFixed(2) : quoteDefaultKeyStatistics?.defaultKeyStatistics?.bookValue}/>
                    <GridCardDetails text="LPA" value={(quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteDefaultKeyStatistics?.defaultKeyStatistics?.floatShares).toFixed(2)}/>
                    <GridCardDetails text="ROE" value={`${((quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteBalanceSheetHistory?.totalStockholderEquity) * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="ROA" value={`${((quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteBalanceSheetHistory?.totalAssets) * 100).toFixed(2)}%`}/>
                    <GridCardDetails text="DÍVIDA LÍQUIDA / PATRIMÔNIO" value={(quoteFinancialData?.financialData?.totalDebt / quoteBalanceSheetHistory?.totalStockholderEquity).toFixed(2)}/>
                    <GridCardDetails text="DÍVIDA LÍQUIDA / EBIT" value={(quoteFinancialData?.financialData?.totalDebt / quoteIncomeStatementHistory?.ebit).toFixed(2)}/>
                    <GridCardDetails text="DÍVIDA LÍQUIDA / EBITDA" value={(quoteFinancialData?.financialData?.totalDebt / quoteFinancialData?.financialData?.ebitda).toFixed(2)}/>
                </div>
            </div>
            <div className="flex-row justify-center bg-white mt-14 rounded-lg">
                <p className="text-2xl m-4 mt-8">Dividendos pagos</p>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={dividendData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis dataKey="total" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#005cbf" />

                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white  shadow rounded-lg xl:flex lg:flex w-full mt-14 mb-8">
                <div className="xl:w-2/5 lg:w-2/5 bg-gray-100 py-8 border-gray-300 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <div className="h-24 w-24 rounded-full mb-3">
                            <img className="h-full w-full object-cover rounded-full shadow" src={quoteFinancialData?.logourl} alt />
                        </div>
                        <p className="mb-6 text-lg font-bold text-gray-900 ">{quoteFinancialData?.longName}</p>
                        <SaveButton functionButton={null} text={<a href={quoteSummaryProfile?.website}>Visit website</a>} className={null}/>
                    </div>
                </div>
                <div className="xl:w-3/5 lg:w-3/5 px-6 py-8">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-2/5 mb-8">
                            <div className="border-b pb-3">
                                <p className="mb-2 text-sm text-gray-700 font-medium">Industría</p>
                                <p className="text-sm text-gray-700 ">{quoteSummaryProfile?.industry}</p>
                            </div>
                        </div>
                        <div className="w-2/5 mb-8">
                            <div className="border-b pb-3">
                                <p className="mb-2 text-sm text-gray-700 font-medium">Endereço</p>
                                <p className="text-sm text-gray-700 ">{quoteSummaryProfile?.address1}, {quoteSummaryProfile?.city}, {quoteSummaryProfile?.country}, CEP: {quoteSummaryProfile?.zip}</p>
                            </div>
                        </div>
                        <div className="w-2/5 mb-8">
                            <div className="border-b pb-3">
                                <p className="mb-2 text-sm text-gray-700 font-medium">Setor</p>
                                <p className="text-sm text-gray-700 ">{quoteSummaryProfile?.sector}</p>
                            </div>
                        </div>
                        <div className="w-2/5 mb-8">
                            <div className="border-b pb-3">
                                <p className="mb-2 text-sm text-gray-700 font-medium">Telefone</p>
                                <p className="text-sm text-gray-700 ">{quoteSummaryProfile && "phone" in quoteSummaryProfile ? quoteSummaryProfile?.phone : "Sem telefone"}</p>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="border-b pb-3">
                                <p className="mb-2 text-sm text-gray-700 font-medium">Descrição</p>
                                <p className="text-sm text-gray-700 ">{quoteSummaryProfile?.longBusinessSummary}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;