import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Button from "../../components/button";
import TableInvestments from "../../components/table/tableInvestments";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";

const InvestmentsWallet = () => {
    const [listActives, setListActives] = useState([]);
    const token = GetCookie("user_session");
    
    async function getAllWalletData() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const listActivesResponse = await investmentsServices.getAllWalletData(token, userId);
        console.log("🚀 ~ getAllWalletData ~ listActivesResponse:", listActivesResponse)
        
        setListActives(listActivesResponse);
    }

    useEffect(() => {
        getAllWalletData();

    }, []);

    return (

        <>
            <Navbar />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <div className="w-full sm:px-6">
                        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-t-lg">
                            <div className="sm:flex items-center justify-between">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Ativos</p>
                                <div>
                                    <Button text="Adicionar Ativo" functionButton={null} />
                                </div>
                            </div>
                        </div>
                        {listActives.map((value) => (
                            <TableInvestments nameType={value.name_type} totalActive={value.count}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvestmentsWallet;