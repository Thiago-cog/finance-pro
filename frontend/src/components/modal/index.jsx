import { useState, useEffect } from "react";
import investmentsServices from "../../services/investmentsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Modal({ isOpen, setOpenToModal, stock, quoteValue }) {
    const [listWallets, setListWallets] = useState([]);
    const [listTypeInvestments, setListTypeInvestments] = useState([]);
    const [valueQuantity, setValueQuantity] = useState(1);
    const [totalValue, setTotalValue] = useState(1);
    const [walletId, setWalletId] = useState(null);
    const [typeInvestmentId, setTypeInvestmentId] = useState(null);

    const token = GetCookie("user_session");

    async function getWallets() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const resultWallets = await investmentsServices.getAllWalletsByUserId(token, userId);
        const resultTypeInvestments = await investmentsServices.getTypeInvestments(token);
        const selectObject = { "id": 0, "name": "Selecione" };

        resultWallets.unshift(selectObject);
        resultTypeInvestments.unshift(selectObject);

        setListWallets(resultWallets);
        setListTypeInvestments(resultTypeInvestments);
    }

    function setQuantity(quantity) {
        setValueQuantity(quantity);
        const totalValue = quoteValue * quantity;
        setTotalValue(totalValue.toFixed(2));
    }

    function setWalletIdSelect(e) {
        let walletId = e.target.value;
        setWalletId(walletId);
    }

    function setTypeInvestmentIdSelect(e) {
        let typeInvestmentId = e.target.value;
        setTypeInvestmentId(typeInvestmentId);
    }

    const handleSave = async (e) => {
        const quoteData = {
            walletId: parseInt(walletId),
            typeInvestments: parseInt(typeInvestmentId),
            stock: stock,
            quantity: parseInt(valueQuantity),
            quoteValue: parseFloat(totalValue)
        };

        const resultAddQuote = await investmentsServices.addQuote(token, quoteData);

        if (resultAddQuote?.status === 400) {
            toast.info(`${resultAddQuote?.data?.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (resultAddQuote?.status === 500) {
            toast.error('Internal Server Error!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success(`${resultAddQuote?.data?.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        getWallets();
        setQuantity(1);
    }, [isOpen]);

    if (isOpen) {
        return (
            <>
                <ToastContainer />
                <div className="fixed bg-black bg-opacity-50 inset-0 z-50">
                    <div className="fixed top-1/2 left-1/2 rounded-lg p-16 xl:w-2/6 xl:h-3/6 -translate-y-2/4 -translate-x-2/4 bg-white shadow-lg">
                        <button className="absolute top-0 right-0 mt-3 mr-3 hover:bg-gray-200 rounded-lg" onClick={() => setOpenToModal(!isOpen)}>
                            <X className="w-6 h-6" />
                        </button>
                        <div className="mb-4">
                            <h1 className="text-2xl font-sans font-bold">Adicionar Ativo</h1>
                        </div>
                        <div className=" w-full grid grid-cols-2 gap-2">
                            <div className="mb-4">
                                <label>Carteiras</label>
                                <select className="border-gray-300 w-48 h-14 rounded-lg outline-none focus:bg-gray-50" onChange={setWalletIdSelect} value={walletId}>
                                    {listWallets.map((wallet, index) => (
                                        <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={wallet.id}>{wallet.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Cotação em R$</label>
                                <input type="text" value={quoteValue} disabled className="rounded-lg border-gray-300 h-14" />
                            </div>
                            <div className="mb-4">
                                <label>Tipo do ativo</label>
                                <select className="border-gray-300 w-48 h-14 rounded-lg outline-none focus:bg-gray-50" onChange={setTypeInvestmentIdSelect} value={typeInvestmentId}>
                                    {listTypeInvestments.map((typeInvestment, index) => (
                                        <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={typeInvestment.id}>{typeInvestment.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>Quantidade</label>
                                <input type="text" onChange={(e) => setQuantity(e.target.value)} value={valueQuantity} className="rounded-lg border-gray-300 h-14" />
                            </div>
                            <div className="mb-4">
                                <label>Valor Total em R$</label>
                                <input type="text" value={totalValue} disabled className="rounded-lg border-gray-300 h-14" />
                            </div>
                        </div>
                        <div>
                            <button className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg font-medium transition duration-150 ease-in-out text-white px-6 py-2 text-sm  focus:outline-none" onClick={handleSave}>Salvar</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Modal;
