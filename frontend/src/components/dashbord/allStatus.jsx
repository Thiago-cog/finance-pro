import { useEffect, useState } from "react";
import authServices from "../../services/authServices";
import accountsServices from "../../services/accountsServices";
import GetCookie from "../../hooks/getCookie";

function AllStatus() {
    const [totalBalance, setTotalBalance] = useState("");
    const token = GetCookie("user_session");
    
    async function getAccounts() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const response = await accountsServices.getAccounts(token, userId);
        let value = 0;

        response.accounts.forEach(account => {
            value += account.balance;
        });

        value = String(value).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
        setTotalBalance(value);
    }
    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            <div className="w-full flex items-center justify-center py-4">
                <div className="py-4 w-full md:py-8 bg-white shadow rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-28">
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Receitas/Despesas</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">89.5%</p>
                            <div className="flex flex-col md:w-64">
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <path d="M8 3.33334V12.6667" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-xs leading-none text-green-600">4.3%</p>
                                    </div>
                                </div>
                                <div className="mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-1/2 h-1 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Saldo</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">R$ {totalBalance}</p>
                            <div className="flex flex-col">
                                <div className="h-4" />
                                <div className="md:w-64 mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-40 h-1 bg-lime-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Despesas</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">R$ 3.922,00</p>
                            <div className="flex flex-col md:w-64">
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <path d="M8 3.33334V12.6667" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-xs leading-none text-green-600">9.1%</p>
                                    </div>
                                </div>
                                <div className="mt-2.5">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div className="w-44 h-1 bg-yellow-500 rounded-full" />
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