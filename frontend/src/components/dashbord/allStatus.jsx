import { useEffect, useState } from "react";
import authServices from "../../services/authServices";
import accountsServices from "../../services/accountsServices";
import GetCookie from "../../hooks/getCookie";

function AllStatus() {
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);
    const token = GetCookie("user_session");
    
    async function getAllStatus() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const response = await accountsServices.getAllStatus(token, userId);

        setTotalBalance(response.allStatusData.balanceTotal);
        setTotalExpense(response.allStatusData.expenseTotal);
        setProfitMargin(response.allStatusData.profitMargin);
    }
    useEffect(() => {
        getAllStatus();
    }, []);

    return (
        <>
            <div className="w-full flex items-center justify-center py-4">
                <div className="py-4 w-full md:py-8 bg-white shadow rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-28">
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Margem de Lucro</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">{profitMargin}%</p>
                            <div className="flex flex-col md:w-64">
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center">
                                    </div>
                                </div>
                                <div className="mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-full h-1 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Saldo</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">R$ {totalBalance}</p>
                            <div className="flex flex-col md:w-64">
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center">
                                    </div>
                                </div>
                                <div className="mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-full h-1 bg-lime-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Despesas</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">R$ {totalExpense}</p>
                            <div className="flex flex-col md:w-64">
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center">
                                    </div>
                                </div>
                                <div className="mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-full h-1 bg-yellow-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllStatus;