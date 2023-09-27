import { useState, useEffect } from "react";
import { CreditCard } from 'lucide-react';

import { InputMoney } from "../input/inputMoney";
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";

function FormCard() {
    const [nameAccount, setNameAccount] = useState("");
    const [typeAccount, setTypeAccount] = useState(1);
    const [valueBalance, setValueBalance] = useState(0);
    const [listAccounts, setListAccounts] = useState([]);
    const token = GetCookie("user_session");


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
                <div class="relative overflow-x-auto rounded-md">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    nome da conta
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    tipo da conta
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    saldo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAccounts.map((account, index) => (
                                <tr class="bg-white border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {account.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {account.type_account}
                                    </td>
                                    <td class="px-6 py-4">
                                        Ativa
                                    </td>
                                    <td class="px-6 py-4">
                                        R$ {String(account.balance).replace(/\D/g, "").replace(/(\d)(\d{2})$/g, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".")}
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
                                    <div className="svg-container group-hover:text-sky-600">
                                        <CreditCard />
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-medium leading-none text-slate-800 group-hover:text-sky-600 ">
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
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Número do Cartão
                                </p>
                                <div className="mb-5">
                                    <input className="font-sans font-normal text-base  w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} type="text" />
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800 pb-2">
                                    Conta
                                </p>
                                <div className="relative top-1">
                                    <select className=" border-gray-300 relative flex items-center justify-between w-full h-14 px-5 py-4 rounded outline-none focus:bg-gray-50" onChange={setValueTypeAccount}>
                                        {listAccounts.map((account, index) => (
                                            <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={account.id}>{account.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Limite do Cartão
                                </p>
                                <div className="flex pt-4">
                                    <InputMoney
                                        onValue={setValueBalance}
                                        classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l"
                                        classInput="w-full p-3 border border-gray-300 rounded-r outline-none focus:bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Valor da Fatura
                                </p>
                                <div className="flex pt-4">
                                    <InputMoney
                                        onValue={setValueBalance}
                                        classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l"
                                        classInput="w-full p-3 border border-gray-300 rounded-r outline-none focus:bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Data de Vencimento
                                </p>
                                <div className="mb-5">
                                    <input className="font-sans font-normal text-base  w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                        <button onClick={handleSave} className="bg-sky-500 rounded hover:bg-sky-400 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full ">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FormCard;