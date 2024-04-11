import { useEffect, useState } from "react";
import { Bitcoin, CircleDollarSign, CandlestickChart, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";

function Index() {
    const [listQuote, setQuote] = useState([]);
    const [listQuoteFilter, setListQuoteFilter] = useState([]);

    async function getAllQuote() {
        const response = await investmentsServices.getListQuote();
        setQuote(response);
    }

    function filtrarStocksUnicas(listQuote) {
        const letrasUnicas = {};
        const quotesFiltradas = [];

        listQuote.forEach(quote => {
            const letrasStock = quote.stock.replace(/[^a-zA-Z]/g, '');
            const ehStockUnica = !letrasUnicas[letrasStock] && !quote.stock.endsWith('F');
            if (ehStockUnica) {
                letrasUnicas[letrasStock] = true;
                quotesFiltradas.push(quote);
            }
        });
    
        setListQuoteFilter(quotesFiltradas);
    }
    
    useEffect(() => {
        getAllQuote();
        
    }, []);

    useEffect(() => {
        filtrarStocksUnicas(listQuote); 
    }, [listQuote]);

    return (
        <>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="text-gray-700 dark:text-gray-500">
                        <div className="dark:text-gray-500">
                            <CircleDollarSign />
                        </div>
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">Renda Fixa</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 2.330,00</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-green-400">
                                <TrendingUp />
                            </div>
                            <p className="text-green-400 text-xs tracking-wide font-bold leading-normal pl-1">7,2% Variação</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="text-gray-700 ">
                        <div className="text-gray-500">
                            <CandlestickChart />
                        </div>
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">Ações</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 375,80</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-green-400">
                                <TrendingUp />
                            </div>
                            <p className="text-green-400 text-xs tracking-wide font-bold leading-normal pl-1">8,2% Variação</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="text-gray-700 ">
                        <div className="dark:text-gray-500">
                            <Building2 />
                        </div>
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">FIIs</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold">R$ 1.642,23</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-red-400">
                                <TrendingDown />
                            </div>
                            <p className="text-red-400 text-xs tracking-wide font-bold leading-normal pl-1">3,5% Variação</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                    <div className="dark:text-gray-500">
                        <Bitcoin />
                    </div>
                    <div className="pl-3 pr-10 mt-1">
                        <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">Criptomoedas</h3>
                        <div className="flex items-end mt-4">
                            <h2 className="text-gray-800  text-2xl leading-normal font-bold">R$ 1200,00</h2>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-green-400">
                                <TrendingUp />
                            </div>
                            <p className="text-green-400 text-xs tracking-wide font-bold leading-normal pl-1">7,2% Variação</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-96 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6 ">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 ">Maiores Valores de Mercado</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 ">
                        {listQuoteFilter.map((quote, index) => (
                            <li className="py-3 sm:py-4" key={index}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={quote.logo} alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                            {quote.stock}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate ">
                                            {quote.name}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                        R$ {quote.market_cap}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Index;