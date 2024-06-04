import { useEffect, useState } from "react";
import { CircleDollarSign, CandlestickChart, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import investmentsServices from "../../services/investmentsServices";

export default function GridCardStatusWallet({ stocks, type, totalActive, totalBuyPrice, totalSum }) {
    const [iconType, setIconType] = useState(null);
    const [variationType, setVariationType] = useState(0);
    const [currentTotalValueType, setCurrentTotalValueType] = useState(0);

    async function walletData() {
        const stockValues = [];
        stocks.forEach(stock => {
            stockValues.push(stock.stock);
        });

        const stockString = stockValues.join(',');

        const listStocksDetailsResponse = await investmentsServices.getStocks(stockString);
        let totalValueType = 0;

        stocks.forEach(value => {
            const matchedItem = listStocksDetailsResponse.find(stockDetails => value.stock === stockDetails.symbol);
            const currentTotalValue = (matchedItem.regularMarketPrice * parseInt(value.total_quantity)).toFixed(2);
            totalValueType += +currentTotalValue;
        });

        const variationPercentageType = ((totalValueType - totalBuyPrice) / totalBuyPrice) * 100;

        setVariationType(variationPercentageType);
        setCurrentTotalValueType(totalValueType)
    }


    function chooseIcon(type) {
        if (type == "Ações") {
            setIconType(<CandlestickChart />);
        } else if (type == "FIIs") {
            setIconType(<Building2 />);
        } else {
            setIconType(<CircleDollarSign />);
        }
    }

    useEffect(() => {
        chooseIcon(type);
        walletData();
    }, []);

    return (
        <div className="bg-white rounded py-5 pl-6 flex items-start shadow">
            <div className="text-gray-700 ">
                <div className="text-gray-500">
                    {iconType}
                </div>
            </div>
            <div className="pl-3 pr-10 mt-1">
                <h3 className="font-bold font-sans leading-4 text-gray-700 text-base">{type}</h3>
                <div className="flex items-end mt-4">
                    <h2 className="text-gray-800 text-2xl leading-normal font-bold">R$ {currentTotalValueType?.toFixed(2)}</h2>
                </div>
                <div className="flex items-center mt-5">
                    {variationType < 0 ? (
                        <p className="text-xs tracking-wide font-bold leading-normal pl-1 text-red-500 flex"><TrendingDown />{variationType.toFixed(2)}% Variação</p>
                    ) : (
                        <p className="text-xs tracking-wide font-bold leading-normal pl-1 text-green-500 flex"><TrendingUp />{variationType.toFixed(2)}% Variação</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
}


