import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import SaveButton from "../../components/button/saveButton";
import Loading from "../../components/loading";
import Modal from "../../components/modal/index";
import WalletChart from "../../components/walletChart";
import TableInvestments from "../../components/table/tableInvestments";
import TableRankStock from "../../components/table/tableRankStock";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import BackButton from "../../components/button/backButton";

const InvestmentsWallet = () => {
    const [listActives, setListActives] = useState([]);
    const [disabledLoading, setDisableLoading] = useState(false);
    const [openToModal, setOpenToModal] = useState(false);
    const token = GetCookie("user_session");

    async function getAllWalletData() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const listActivesResponse = await investmentsServices.getAllWalletData(token, userId);

        setListActives(listActivesResponse);
        setDisableLoading(true);
    }

    useEffect(() => {
        getAllWalletData();
    }, []);

    return (
        <>
            <Navbar />
            <Modal isOpen={openToModal} setOpenToModal={setOpenToModal} stock={null} quoteValue={0} />
            <Loading disable={disabledLoading} />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className="sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between bg-gray-900 w-full h-auto md:h-96 mt-16 rounded-lg">
                        <TableRankStock />
                        <WalletChart />
                    </div>
                </div>
                <div className="mt-14">
                    <div className="w-full sm:px-6">
                        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-t-lg">
                            <div className="sm:flex items-center justify-between">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Ativos</p>
                                <div>
                                    <SaveButton text="Adicionar Ativo" functionButton={() => setOpenToModal(!openToModal)} />
                                </div>
                            </div>
                        </div>
                        {listActives.map((value) => (
                            <TableInvestments nameType={value.name_type} totalActive={value.count} stocks={value.stocks} totalBuyPrice={value.total} totalSum={value.totalSum} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvestmentsWallet;