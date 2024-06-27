import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";


export default function TableInvestments({ nameType, totalActive, stocks, totalBuyPrice, totalSum }) {
    const [isOpen, setisOpen] = useState(false);
    const [unifiedActions, setUnifiedActions] = useState([]);
    const [variationType, setVariationType] = useState(0);
    const [currentTotalValueType, setCurrentTotalValueType] = useState(0);
    const [percentageByType, setPercentageByType] = useState(0);

    async function getDetailsStocks() {
        const stockValues = [];
        stocks.forEach(stock => {
            stockValues.push(stock.stock);
        });

        const stockString = stockValues.join(',');

        const listStocksDetailsResponse = await investmentsServices.getStocks(stockString);
        let totalValueType = 0;

        const unifiedArray = stocks.map(value => {
            const matchedItem = listStocksDetailsResponse.find(stockDetails => value.stock === stockDetails.symbol);
            const currentTotalValue = (matchedItem.regularMarketPrice * parseInt(value.total_quantity)).toFixed(2);
            const variationPercentage = ((currentTotalValue - value.total_value) / value.total_value) * 100;

            totalValueType += +currentTotalValue;

            if (matchedItem) {
                const { logourl, regularMarketPrice, longName } = matchedItem;
                return {
                    ...value,
                    logourl,
                    regularMarketPrice,
                    longName,
                    currentTotalValue,
                    variationPercentage
                };
            } else {
                return value;
            }
        });
        const variationPercentageType = ((totalValueType - totalBuyPrice) / totalBuyPrice) * 100;
        const percentageByType = (totalBuyPrice / totalSum) * 100;

        setPercentageByType(percentageByType);
        setVariationType(variationPercentageType);
        setCurrentTotalValueType(totalValueType);
        setUnifiedActions(unifiedArray);
    }

    useEffect(() => {
        getDetailsStocks();
    }, []);

    return (
        <>
            <div className="p-4 bg-gray-100 cursor-pointer flex flex-wrap justify-between items-center border-2" onClick={() => setisOpen(!isOpen)}>
                <div className="text-lg w-full sm:w-auto mb-2 sm:mb-0">
                    <p>{`${nameType}: ${totalActive} Ativos`}</p>
                </div>
                <div className="text-lg w-full sm:w-auto mb-2 sm:mb-0">
                    <p>Valor Total: R$ {currentTotalValueType?.toFixed(2)}</p>
                </div>
                <div className="text-lg w-full sm:w-auto mb-2 sm:mb-0">
                    {variationType < 0 ? (
                        <p className="text-red-500 flex">Variação: <TrendingDown />{variationType?.toFixed(2)}%</p>
                    ) : (
                        <p className="text-green-500 flex">Variação: <TrendingUp />{variationType?.toFixed(2)}%</p>
                    )}
                </div>
                <div className="text-lg w-full sm:w-auto mb-2 sm:mb-0">
                    <p>Porcentagem na carteira: {percentageByType.toFixed(2)}%</p>
                </div>
                <button className="text-gray-500 w-full sm:w-auto text-right">
                    {isOpen ? '▲' : '▼'}
                </button>
            </div>
            {isOpen && (
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-6 w-full text-sm leading-none text-gray-800">
                                <th className="font-semibold text-left pl-4 text-base">Ativo</th>
                                <th className="font-semibold text-left pl-4 md:pl-12 text-base">Quantidade</th>
                                <th className="font-semibold text-left pl-4 md:pl-12 text-base">Preço Médio</th>
                                <th className="font-semibold text-left pl-4 md:pl-20 text-base">Preço Atual</th>
                                <th className="font-semibold text-left pl-4 md:pl-20 text-base">Variação %</th>
                                <th className="font-semibold text-left pl-4 md:pl-16 text-base">Total</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {unifiedActions.map((stock) => (
                                <tr key={stock.stock} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                    <td className="pl-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10">
                                                <img className="w-full h-full rounded-full" src={stock.logourl} />
                                            </div>
                                            <div className="pl-4">
                                                <p className="font-medium">{stock.stock}</p>
                                                <p className="text-xs leading-3 text-gray-600 pt-2">{stock.longName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-4 md:pl-12">
                                        <p className="font-medium leading-none text-gray-800 text-base">{stock.total_quantity}</p>
                                    </td>
                                    <td className="pl-4 md:pl-12">
                                        <p className="font-medium text-base">R$ {(stock.total_value / stock.total_quantity).toFixed(2)}</p>
                                    </td>
                                    <td className="pl-4 md:pl-20">
                                        <p className="font-medium text-base">R$ {stock.regularMarketPrice}</p>
                                    </td>
                                    <td className="pl-4 md:pl-20">
                                        {stock.variationPercentage < 0 ? (
                                            <p className="font-medium text-red-500 text-base flex"><TrendingDown />{stock.variationPercentage.toFixed(2)}%</p>
                                        ) : (
                                            <p className="font-medium text-green-500 text-base flex"><TrendingUp />{stock.variationPercentage.toFixed(2)}%</p>
                                        )}
                                    </td>
                                    <td className="pl-4 md:pl-16">
                                        <p className="font-medium text-base">R$ {(stock.regularMarketPrice * stock.total_quantity).toFixed(2)}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}