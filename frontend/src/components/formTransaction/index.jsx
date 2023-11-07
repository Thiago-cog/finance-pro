import { useState, useEffect } from "react";
import { ArrowLeftRight, PenSquare, XCircle } from 'lucide-react';

import { InputMoney } from "../input/inputMoney";
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";

function FormAccount() {
    const [nameAccount, setNameAccount] = useState("");
    const [typeAccount, setTypeAccount] = useState(1);
    const [valueBalance, setValueBalance] = useState(0);
    const [listAccounts, setListAccounts] = useState([]);
    const [activeTab, setActiveTab] = useState('extract');

    const token = GetCookie("user_session");

    const changeTab = (tab) => {
        console.log('click');
        setActiveTab(tab);
    };

    async function getAccounts() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const response = await accountsServices.getAccounts(token, userId);
        setListAccounts(response.accounts)
    }

    useEffect(() => {
        getAccounts();
    }, []);

    function setValueTypeAccount(e) {
        let valueTypeAccount = e.target.value;
        setTypeAccount(valueTypeAccount);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const response = await accountsServices.createAccount(token, nameAccount, typeAccount, valueBalance, userId);
        setNameAccount("");
        getAccounts();
        alert(response.message);
    }

    return (
        <>
            <div className="py-4 px-2">
                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    nome da conta
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    tipo da conta
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    saldo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAccounts.map((account, index) => (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap font-sans">
                                        {account.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {account.type_account}
                                    </td>
                                    <td className="px-6 py-4">
                                        Ativa
                                    </td>
                                    <td className="px-6 py-4">
                                        R$ {
                                            account.isInteger
                                                ? String(account.balance + '00').replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".")
                                                : String(account.balance).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".")
                                        }
                                    </td>
                                    <td className="px-6 py-4 flex">
                                        <PenSquare className="w-5 h-5 mr-1" />
                                        <XCircle className="w-5 h-5" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-md shadow mt-7 py-7">
                    <div className="hidden lg:block md:hidden">
                        <div className="px-7 header flex bg-white lg:justify-around md:justify-around justify-start pb-8 pt-2 border-b-[2px] border-slate-100 flex-wrap gap-x-2">
                            <a className="cursor-pointer" onClick={() => changeTab('extract')}>
                                <div className="flex items-center instance group">
                                    <div className="svg-container">
                                        <ArrowLeftRight />
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-semibold font-sans leading-none text-slate-800">
                                            Extrato
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a className="cursor-pointer" onClick={() => changeTab('invoice')}>
                                <div className="flex items-center instance group">
                                    <div className="svg-container">
                                        <ArrowLeftRight />
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-semibold font-sans leading-none text-slate-800">
                                            Fatura
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    {activeTab === 'extract' && (
                        <div className="mt-10 px-8">

                            <p className="text-xl font-semibold font-sans text-gray-800">
                                Cadastro de Movimentação do Extrato
                            </p>
                            <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-10">
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Nome da conta
                                    </p>
                                    <div className="mb-5">
                                        <input className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} type="text" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Tipo de Conta
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueTypeAccount}>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={1}>Conta Corrente</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={2}>Conta Poupança</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Saldo
                                    </p>
                                    <div className="flex pt-4">
                                        <InputMoney
                                            onValue={setValueBalance}
                                            classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                            classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'invoice' && (
                        <div className="mt-10 px-8">

                            <p className="text-xl font-semibold font-sans text-gray-800">
                                Cadastro de Movimentação da Fatura
                            </p>
                            <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-10">
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Nome da conta
                                    </p>
                                    <div className="mb-5">
                                        <input className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} type="text" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Tipo de Conta
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueTypeAccount}>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={1}>Conta Corrente</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={2}>Conta Poupança</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Saldo
                                    </p>
                                    <div className="flex pt-4">
                                        <InputMoney
                                            onValue={setValueBalance}
                                            classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                            classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                        <button onClick={handleSave} className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg transform font-bold px-6 py-4 text-white lg:max-w-[144px] w-full ">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FormAccount;
