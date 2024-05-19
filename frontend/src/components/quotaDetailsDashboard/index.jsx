import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { Wallet } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";
import Modal from "../modal/index";

function Index({ stock }) {

    const [quoteFinancialData, setQuoteFinancialData] = useState({});
    const [quoteDefaultKeyStatistics, setQuoteDefaultKeyStatistics] = useState({});
    const [quoteSummaryProfile, setQuoteSummaryProfile] = useState({});
    const [quoteIncomeStatementHistory, setQuoteIncomeStatementHistory] = useState({});
    const [quoteBalanceSheetHistory, setQuoteBalanceSheetHistory] = useState({});
    const [quoteValueChartData, setQuoteValueChartData] = useState([]);
    const [dividendData, setDividendData] = useState([]);
    const [openToModal, setOpenToModal] = useState(false);

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
        
    }

    useEffect(() => {
        getQuoteAllStatusByName();
    }, []);


    return (
        <>
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
                <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">Cotação</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold lg:text-xl">R$ {quoteFinancialData?.financialData?.currentPrice}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">Variação (dia)</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold lg:text-xl">R$ {parseFloat(quoteFinancialData?.regularMarketChange?.toFixed(2))} ({quoteFinancialData?.regularMarketChangePercent?.toFixed(2)}%)</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">P/L</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold lg:text-xl">{quoteDefaultKeyStatistics?.defaultKeyStatistics?.forwardPE?.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">P/VP</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold lg:text-xl">{quoteDefaultKeyStatistics?.defaultKeyStatistics?.priceToBook?.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">DY</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold lg:text-xl">R$ 1200,00</h2>
                        </div>
                    </div>
                </div>
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
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            P/L
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {quoteDefaultKeyStatistics?.defaultKeyStatistics?.forwardPE?.toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            P/RECEITA (PSR)
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.currentPrice / quoteFinancialData?.financialData?.revenuePerShare).toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            P/VP
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {quoteDefaultKeyStatistics?.defaultKeyStatistics?.priceToBook?.toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            MARGEM LÍQUIDA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteDefaultKeyStatistics?.defaultKeyStatistics?.profitMargins * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            MARGEM BRUTA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.grossMargins * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            MARGEM EBITDA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.ebitdaMargins * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            MARGEM EBIT
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {((quoteIncomeStatementHistory?.ebit / quoteIncomeStatementHistory?.totalRevenue) * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            EV/EBITDA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {quoteDefaultKeyStatistics?.defaultKeyStatistics?.enterpriseToEbitda?.toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            EV/EBIT
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteDefaultKeyStatistics?.defaultKeyStatistics?.enterpriseValue / quoteIncomeStatementHistory?.ebit).toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            VPA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteDefaultKeyStatistics?.defaultKeyStatistics?.bookValue)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            LPA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteDefaultKeyStatistics?.defaultKeyStatistics?.floatShares).toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            ROE
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {((quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteBalanceSheetHistory?.totalStockholderEquity) * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            ROA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {((quoteDefaultKeyStatistics?.defaultKeyStatistics?.netIncomeToCommon / quoteBalanceSheetHistory?.totalAssets) * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            DÍVIDA LÍQUIDA / PATRIMÔNIO
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.totalDebt / quoteBalanceSheetHistory?.totalStockholderEquity).toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            DÍVIDA LÍQUIDA / EBIT
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.totalDebt / quoteIncomeStatementHistory?.ebit).toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg m-4 border-2 h-28">
                        <p className="text-xl text-gray-500 ml-4 mt-2 font-sans font-medium">
                            DÍVIDA LÍQUIDA / EBITDA
                        </p>
                        <p className="text-2xl ml-4 mt-4 font-bold font-sans text-black">
                            {(quoteFinancialData?.financialData?.totalDebt / quoteFinancialData?.financialData?.ebitda).toFixed(2)}
                        </p>
                    </div>
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

                        <button className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg font-medium transition duration-150 ease-in-out text-white px-6 py-2 text-sm  focus:outline-none"><a href={quoteSummaryProfile?.website}>Visit website</a></button>
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