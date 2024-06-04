import { useEffect, useState } from "react";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import BackButton from "../button/backButton";

export default function TableRankStock() {
    const [listRankStocks, setListRankStocks] = useState([]);
    const token = GetCookie("user_session");

    async function getRankStocks() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;

        const resultRankStocks = await investmentsServices.getRankStocks(token, userId);

        const stockValues = [];
        resultRankStocks.forEach(position => {
            stockValues.push(position.stock);
        });

        const stockString = stockValues.join(',');
        const listStocksDetailsResponse = await investmentsServices.getStocks(stockString);

        const unifiedArray = resultRankStocks.map(position => {
            const matchedItem = listStocksDetailsResponse.find(stockDetails => position.stock === stockDetails.symbol);
            const currentTotalValue = parseFloat(matchedItem.regularMarketPrice * parseInt(position.total_quantity)).toFixed(2);

            if (matchedItem) {
                const { logourl, longName } = matchedItem;
                return {
                    ...position,
                    logourl,
                    longName,
                    currentTotalValue
                };
            }
        });

        setListRankStocks(unifiedArray);
    }

    useEffect(() => {
        getRankStocks();
    }, []);

    return (
        <>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto rounded-lg w-2/4 mr-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 mb-2 border-b">Rank de ativos</p>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-6 w-full text-sm leading-none text-gray-800">
                            <th className="font-semibold text-left pl-4 text-base">Ativo</th>
                            <th className="font-semibold text-left pl-12 text-base">Quantidade</th>
                            <th className="font-semibold text-left pl-12 text-base">Total</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {listRankStocks.map((position, index) => (
                            <tr key={index} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <div className="flex items-center">
                                        <p>{index + 1} °</p>
                                        <div className="w-10 h-10 ml-1">
                                            <img className="w-full h-full rounded-full" src={position.logourl} />
                                        </div>
                                        <div className="pl-4">
                                            <p className="font-medium">{position.stock}</p>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">{position.longName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium leading-none text-gray-800 text-base">{position.total_quantity}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium text-base">R$ {position?.currentTotalValue}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}