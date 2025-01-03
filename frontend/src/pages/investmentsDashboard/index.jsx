import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bitcoin, Building2, CandlestickChart, CircleDollarSign, TrendingUp, Wallet } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import Loading from "../../components/loading";
import GridCardStatusWallet from "../../components/gridCard/gridCardStatusWallet";

function Index() {
    const [listActions, setListActions] = useState([]);
    const [listActionsFilter, setListActionsFilter] = useState([]);
    const [listFunds, setListFunds] = useState([]);
    const [listBRDs, setListBRDs] = useState([]);
    const [listQuoteAll, setListQuoteAll] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSearch, setFilerSearch] = useState([]);
    const [disabledLoading, setDisableLoading] = useState(false);
    const [listActives, setListActives] = useState([]);
    const token = GetCookie("user_session");

    const listFilterBySearch = listQuoteAll.filter((quote) => {
        if (search.length >= 3) {
            return quote.stock.startsWith(search.toLocaleUpperCase())
        }
    });


    async function getAllRanks() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;

        const listActionsResponse = await investmentsServices.getListActions();
        const listFundsResponse = await investmentsServices.getListFunds();
        const listBRDsResponse = await investmentsServices.getListBDRs();
        const listQuoteAllResponse = await investmentsServices.getListQuote();
        const listActivesResponse = await investmentsServices.getAllWalletData(token, userId);

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
        setListActives(listActivesResponse);
        setDisableLoading(true);
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
            <Loading disable={disabledLoading} />
            <div className="w-full flex flex-col md:flex-row items-center justify-between mb-5">
                <div></div>
                <div className="relative w-full md:w-auto mb-2">
                    <input className="w-full md:w-96 py-2 rounded-lg" placeholder="Pesquisar" value={search} onChange={(ev) => setSearch(ev.target.value)} />
                    {filterSearch.length > 0 && (
                        <ul className="search-results rounded-lg absolute w-full mt-1 bg-white shadow-lg z-10">
                            {filterSearch.map((quote) => (
                                <li className="bg-white rounded-lg w-full h-12 border" key={quote}>
                                    <Link to={`/quote-details/${quote.stock}`}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full ml-2 mt-2" src={quote.logo} alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate">
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
                    )}
                </div>
                <div className="relative z-20">
                    <Link
                        to={`/investments-wallet`}
                        className="wallet-button flex items-center justify-center border-2 border-white hover:border-gray-300 hover:text-gray-300 rounded-full text-white font-semibold w-28 h-10 focus:outline-none"
                    >
                        Carteira <Wallet className="ml-2" />
                    </Link>
                </div>
            </div>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {listActives.length > 0 ? (
                    listActives.map((value) => (
                        <GridCardStatusWallet
                            key={value.name_type}
                            stocks={value.stocks}
                            totalBuyPrice={value.total}
                            totalActive={value.count}
                            totalSum={value.totalSum}
                            type={value.name_type}
                        />
                    ))
                ) : (
                    <>
                        <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                            <div className="dark:text-gray-500">
                                <CandlestickChart />
                            </div>
                            <div className="pl-3 pr-10 mt-1">
                                <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">Ações</h3>
                                <div className="flex items-end mt-4">
                                    <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 0.00</h2>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-green-400">
                                        <TrendingUp />
                                    </div>
                                    <p className="text-green-500 text-xs tracking-wide font-bold leading-normal pl-1">0,0% Variação</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                            <div className="dark:text-gray-500">
                                <Building2 />
                            </div>
                            <div className="pl-3 pr-10 mt-1">
                                <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">FIIs</h3>
                                <div className="flex items-end mt-4">
                                    <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 0.00</h2>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-green-400">
                                        <TrendingUp />
                                    </div>
                                    <p className="text-green-500 text-xs tracking-wide font-bold leading-normal pl-1">0,0% Variação</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                            <div className="dark:text-gray-500">
                                <CircleDollarSign />
                            </div>
                            <div className="pl-3 pr-10 mt-1">
                                <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">BRDs</h3>
                                <div className="flex items-end mt-4">
                                    <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 0.00</h2>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-green-400">
                                        <TrendingUp />
                                    </div>
                                    <p className="text-green-500 text-xs tracking-wide font-bold leading-normal pl-1">0,0% Variação</p>
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
                                    <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 0.00</h2>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-green-400">
                                        <TrendingUp />
                                    </div>
                                    <p className="text-green-500 text-xs tracking-wide font-bold leading-normal pl-1">0,0% Variação</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {listActives.length > 0 && disabledLoading && (
                    <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
                        <div className="dark:text-gray-500">
                            <Bitcoin />
                        </div>
                        <div className="pl-3 pr-10 mt-1">
                            <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">Criptomoedas</h3>
                            <div className="flex items-end mt-4">
                                <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ 1200.00</h2>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-green-400">
                                    <TrendingUp />
                                </div>
                                <p className="text-green-500 text-xs tracking-wide font-bold leading-normal pl-1">7,2% Variação</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {
                disabledLoading == true && (
                    <div className="flex flex-wrap lg:flex-nowrap">
                        <div className="w-full sm:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6 md:mr-6">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900">Maiores Valores de Mercado</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {listActionsFilter.map((action, index) => (
                                        <li className="py-3 sm:py-4" key={index}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={action.logo} alt="Neil image" />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {action.stock}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {action.name}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                    R$ {action.market_cap}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6 md:mr-6">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900">Maiores Variações de (FIIs)</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {listFunds.map((fund, index) => (
                                        <li className="py-3 sm:py-4" key={index}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={fund.logo} alt="Neil image" />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {fund.stock}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {fund.name}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                    {fund.change}%
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900">Maiores Volumes de Negociações (BRDs)</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {listBRDs.map((action, index) => (
                                        <li className="py-3 sm:py-4" key={index}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={action.logo} alt="Neil image" />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {action.stock}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {action.name}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                    R$ {action.volume}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
export default Index;