import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bitcoin, CircleDollarSign, CandlestickChart, Building2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";

function Index() {
    const [listActions, setListActions] = useState([]);
    const [listActionsFilter, setListActionsFilter] = useState([]);
    const [listFunds, setListFunds] = useState([]);
    const [listBRDs, setListBRDs] = useState([]);
    const [listQuoteAll, setListQuoteAll] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSearch, setFilerSearch] = useState([]);

    const listFilterBySearch = listQuoteAll.filter((quote) => {
        if (search.length >= 3) {
            return quote.stock.startsWith(search.toLocaleUpperCase())
        }
    });


    async function getAllRanks() {
        const listActionsResponse = await investmentsServices.getListActions();
        const listFundsResponse = await investmentsServices.getListFunds();
        const listBRDsResponse = await investmentsServices.getListBDRs();
        const listQuoteAllResponse = await investmentsServices.getListQuote();

        const letrasUnicas = {};
        const actionsFiltered = [];

        listQuoteAllResponse.forEach(quote => {
            const letrasStock = quote.stock.replace(/[^a-zA-Z]/g, '');
            const ehStockUnica = !quote.stock.endsWith('F');
            if (ehStockUnica) {
                letrasUnicas[letrasStock] = true;
                actionsFiltered.push(quote);
            }
        });

        setListActions(listActionsResponse);
        setListFunds(listFundsResponse);
        setListBRDs(listBRDsResponse);
        setListQuoteAll(actionsFiltered);
    }

    function filterStocksUnique(listActions) {
        const letrasUnicas = {};
        const actionsFiltered = [];

        listActions.forEach(quote => {
            const letrasStock = quote.stock.replace(/[^a-zA-Z]/g, '');
            const ehStockUnica = !letrasUnicas[letrasStock] && !quote.stock.endsWith('F');
            if (ehStockUnica) {
                letrasUnicas[letrasStock] = true;
                actionsFiltered.push(quote);
            }
        });

        setListActionsFilter(actionsFiltered);
    }

    useEffect(() => {
        getAllRanks();

    }, []);

    useEffect(() => {
        filterStocksUnique(listActions);
    }, [listActions]);

    useEffect(() => {
        if (search === "") {
            setFilerSearch([]);
        } else {
            setFilerSearch(listFilterBySearch);
        }
    }, [search]);

    return (
        <>
            <div className="w-full flex items-center justify-between mb-5 ">
                <div></div>
                {/* Colocar o checkbox para busca de cripto moeda. */}
                <div className="relative">
                    <input className="w-96 py-2 rounded-lg" placeholder="Pesquisar" value={search} onChange={(ev) => setSearch(ev.target.value)} />
                    <ul className="rounded-lg absolute  w-full h-12">
                        {filterSearch.map((quote) => (
                            <li className="bg-white rounded-lg w-full h-12 border" key={quote}>
                                <Link to={`/quote-details/${quote.stock}`}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full ml-2 mt-2" src={quote.logo} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {quote.stock}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 mr-2">
                                            R$ {parseFloat(quote.close.toFixed(2))}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Link to={`/investments-wallet`} className="flex items-center justify-center border-2 border-white hover:border-gray-300 hover:text-gray-300 rounded-full text-white font-semibold w-28 h-10">
                        Carteira <Wallet/>
                    </Link>
                </div>
            </div>
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
            <div className="flex">
                <div className=" w-1/3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6 mr-6">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Maiores Valores de Mercado</h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 ">
                            {listActionsFilter.map((action, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={action.logo} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {action.stock}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate ">
                                                {action.name}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                            R$ {action.market_cap}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className=" w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6 mr-6">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Maiores Variações de (FIIs)</h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 ">
                            {listFunds.map((fund, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={fund.logo} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {fund.stock}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate ">
                                                {fund.name}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                            {fund.change}%
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className=" w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Maiores Volumes de Negociações (BRDs)</h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 ">
                            {listBRDs.map((action, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={action.logo} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {action.stock}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate ">
                                                {action.name}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                            R$ {action.volume}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Index;