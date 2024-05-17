import { useState, useEffect } from "react";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import { Wallet } from "lucide-react";

function Modal({ isOpen, setOpenToModal, stock }) {
    const [listWallets, setListWallets] = useState([]);
    const token = GetCookie("user_session");

    async function getWallets() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const result = await investmentsServices.getAllWalletsByUserId(token, userId);
        setListWallets(result);
    }

    useEffect(() => {
        getWallets();
    }, [isOpen]);

    if (isOpen) {
        return (
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50">
                <div className="fixed top-1/2 left-1/2 rounded-lg p-16 -translate-y-2/4 -translate-x-2/4 bg-white shadow-lg">
                    <h2>{stock}</h2>
                    {listWallets.map((wallet) => (
                        <p className="text-black text-lg">{wallet.name}</p>
                    ))}
                    <p></p>
                    <button className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg font-medium transition duration-150 ease-in-out text-white px-6 py-2 text-sm  focus:outline-none" onClick={() => setOpenToModal(!isOpen)}>Fechar</button>
                </div>
            </div>
        );
    }
}

export default Modal;
