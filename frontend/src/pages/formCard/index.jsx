import { useState, useEffect } from "react";
import { CreditCard } from 'lucide-react';
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputMoney } from "../../components/input/inputMoney";
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import Button from "../../components/button";

function FormCard() {

    const [numberCard, setNumberCard] = useState("");
    const [accountId, setAccountId] = useState(0);
    const [dueDay, setDueDay] = useState("");
    const [valueLimitCard, setValueLimitCard] = useState("");
    const [valueInvoice, setValueInvoice] = useState("");
    const [listAccounts, setListAccounts] = useState([]);
    const [listCards, setListCards] = useState([]);
    const token = GetCookie("user_session");


    async function getAccounts() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const allAccounts = await accountsServices.getAccounts(token, userId);
        const allCards = await accountsServices.getCards(token, userId);

        const selectObject = {"id": 0, "name": "Selecione"};
        allAccounts.data.accounts.unshift(selectObject);

        allCards.data.cards.forEach(function(card, indice) {
            const valueSplit = String(card.value).split('.');
            const limitAvailableSplit =  String(card.limit_available).split('.');
            if(valueSplit.length == 1){
                allCards.data.cards[indice].value = allCards.data.cards[indice].value + '00';
            }else{
                if(valueSplit[1].length == 1){
                    allCards.data.cards[indice].value = allCards.data.cards[indice].value + '0';
                }
            }

            if(limitAvailableSplit.length == 1){
                allCards.data.cards[indice].limit_available = allCards.data.cards[indice].limit_available + '00';
            }else{
                if(limitAvailableSplit[1].length == 1){
                    allCards.data.cards[indice].limit_available = allCards.data.cards[indice].limit_available + '0';
                }
            }
            allCards.data.cards[indice].value = String(allCards.data.cards[indice].value).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
            allCards.data.cards[indice].limit_available = String(allCards.data.cards[indice].limit_available).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
        });
        
        setListAccounts(allAccounts.data.accounts)
        setListCards(allCards.data.cards)
    }
    useEffect(() => {
        getAccounts();
    }, []);

    function setAccountIdSelect(e) {
        let accountId = e.target.value;
        setAccountId(accountId);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const resultCreatCard = await accountsServices.createCard(token, accountId, numberCard, dueDay, valueLimitCard, valueInvoice);

        if(resultCreatCard.status === 400){
            toast.info(`${resultCreatCard.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else if(resultCreatCard.status === 500){
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
        }else{
            toast.success(`${resultCreatCard.data.message}`, {
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

        setNumberCard("");
        setAccountId(0);
        setDueDay('');
        setValueLimitCard(null);
        setValueInvoice(null);
        getAccounts();
    }

    return (
        <>
            <ToastContainer />
            <div className="py-4 px-2">
                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    número do cartão
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    conta
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    valor da fatura
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    limite disponível 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCards.map((card, index) => (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-4">
                                        {card.number_card}
                                    </th>
                                    <td className="px-6 py-4">
                                        {card.name}
                                    </td>
                                    <td className="px-6 py-4">
                                    R$ {String(card.value).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".")}
                                        
                                    </td>
                                    <td className="px-6 py-4">
                                    R$ {String(card.limit_available).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-md shadow mt-7 py-7">
                    <div className="hidden lg:block md:hidden">
                        <div className="px-7 header flex bg-white lg:justify-around md:justify-around justify-start pb-8 pt-2 border-b-[2px] border-slate-100 flex-wrap gap-x-4 ">
                            <a className="cursor-pointer">
                                <div className="flex items-center instance group">
                                    <div className="svg-container">
                                        <CreditCard />
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-semibold font-sans leading-none text-slate-800">
                                            Cartão
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="mt-10 px-7">
                        <p className="text-xl font-semibold leading-tight text-gray-800">
                            Cadastro de Cartão
                        </p>
                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                            <div>
                                <p className="text-base  font-semibold font-sans leading-none text-gray-800">
                                    Número do Cartão
                                </p>
                                <div>
                                    <InputMask mask="9999 9999 9999 9999" maskPlaceholder={null} className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={numberCard} onChange={(e) => setNumberCard(e.target.value)} type="text" />
                                </div>
                            </div>
                            <div>
                                <p className="text-base  font-semibold font-sans leading-none text-gray-800 pb-2">
                                    Conta
                                </p>
                                <div className="relative top-1">
                                    <select className=" border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setAccountIdSelect} value={accountId}>
                                        {listAccounts.map((account, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={account.id}>{account.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-base  font-semibold font-sans leading-none text-gray-800">
                                    Limite do Cartão
                                </p>
                                <div className="flex pt-4">
                                    <InputMoney
                                        onValue={setValueLimitCard}
                                        classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                        classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-base  font-semibold font-sans leading-none text-gray-800">
                                    Valor da Fatura
                                </p>
                                <div className="flex pt-4">
                                    <InputMoney
                                        onValue={setValueInvoice}
                                        classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                        classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-base  font-semibold font-sans leading-none text-gray-800">
                                    Data de Vencimento
                                </p>
                                <div className="mb-5">
                                    <input className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={dueDay} onChange={(e) => setDueDay(e.target.value)} type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                        <Button functionButton={handleSave} text='Salvar' className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg transform font-bold px-6 py-4 text-white lg:max-w-[144px] w-full"/>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FormCard;