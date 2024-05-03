import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import investmentsServices from "../../services/investmentsServices";
import { Wallet } from 'lucide-react';

function Index({ stock }) {

    const [quoteFinancialData, setQuoteFinancialData] = useState({});
    const [quoteDefaultKeyStatistics, setQuoteDefaultKeyStatistics] = useState({});
    const [quoteValueChartData, setQuoteValueChartData] = useState([]);

    async function getQuoteAllStatusByName() {
        const resultFinancialData = await investmentsServices.getQuoteFinancialDataByName(stock, null);
        const resultDefaultKeyStatistics = await investmentsServices.getQuoteDefaultKeyStatisticsByName(stock, null);

        resultFinancialData?.historicalDataPrice.map((historicalDataPrice) => {
            historicalDataPrice.date = format(new Date(historicalDataPrice.date * 1000), 'dd/MM/yyyy');
        })

        setQuoteFinancialData(resultFinancialData);
        setQuoteDefaultKeyStatistics(resultDefaultKeyStatistics);
        setQuoteValueChartData(resultFinancialData?.historicalDataPrice);
    }

    useEffect(() => {
        getQuoteAllStatusByName();
    }, []);


    return (
        <>
            <nav className="bg-gray-900 border-gray-800 rounded-lg border-4 mb-4">
                <div className="max-w-screen-xl flex items-center mx-auto p-4">
                    <img src={quoteFinancialData?.logourl} alt={quoteFinancialData?.longName} className="h-16 w-16 rounded-md" />
                    <div className="ml-2 flex-row items-center space-x-3">
                        <p className=" text-2xl font-extrabold text-white">{stock}</p>
                        <p className="text-white ">{quoteFinancialData?.longName}</p>
                    </div>
                    <button type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 ml-auto rounded-lg  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                        <Wallet />
                    </button>
                </div>
            </nav>
            <div className="w-full h-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">Cotação</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ {quoteFinancialData?.financialData?.currentPrice}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">Variação (dia)</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ {parseFloat(quoteFinancialData?.regularMarketChange?.toFixed(2))} ({quoteFinancialData?.regularMarketChangePercent?.toFixed(2)}%)</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">P/L</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold">{quoteDefaultKeyStatistics?.defaultKeyStatistics?.forwardPE?.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">P/VP</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold">{quoteDefaultKeyStatistics?.defaultKeyStatistics?.priceToBook?.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-lg">DY</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold">R$ 1200,00</h2>
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
                        <Area dataKey="close" stroke="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </>
    );
}

export default Index;