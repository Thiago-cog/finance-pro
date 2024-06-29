import { useState, useEffect } from "react";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import SaveButton from "../button/saveButton";
import 'react-toastify/dist/ReactToastify.css';

function ModalWallet({ isOpen, setOpenToModal }) {
    const [nameWallet, setNameWallet] = useState('');

    const token = GetCookie("user_session");

    const handleSave = async (e) => {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;

        const walletData = {
            userId,
            name: nameWallet,
        };

        const resultCreateWallet = await investmentsServices.createWallet(token, walletData);

        if (resultCreateWallet?.status === 400) {
            toast.info(`${resultCreateWallet?.data?.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (resultCreateWallet?.status === 500) {
            toast.error('Internal Server Error!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.success(`${resultCreateWallet?.data?.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    }

    if (isOpen) {
        return (
            <>
                <ToastContainer />
                <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg p-8 w-full max-w-2xl mx-auto shadow-lg">
                        <button className="absolute top-3 right-3 hover:bg-gray-200 rounded-lg p-2" onClick={() => setOpenToModal(!isOpen)}>
                            <X className="w-6 h-6" />
                        </button>
                        <div className="mb-4">
                            <h1 className="text-2xl font-sans font-bold">Criar carteira</h1>
                        </div>
                        <div className="grid grid-cols-1">
                            <div>
                                <label>Nome da carteira </label>
                                <input type="text" value={nameWallet} onChange={(e) => setNameWallet(e.target.value)} className="rounded-lg border-gray-300 w-full h-14" />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <SaveButton functionButton={handleSave} text='Salvar' />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export default ModalWallet;
