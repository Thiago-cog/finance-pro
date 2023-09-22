import { useState, useEffect } from "react";
import { Wallet, CreditCard } from 'lucide-react';

function FormAccount() {
    const [nameAccount, setNameAccount] = useState("");
    const [valueBalance, setValueBalance] = useState("");
    const [typeAccount, setTypeAccount] = useState(1);

    // useEffect(() => { });

    function handleValueBalanceChange(e) {
        let inputValue =  e.target.value;
        // let valueFormat = inputValue.replace(/[^0-9.]/g, '');
        // let value = parseFloat(valueFormat).toFixed(2);
        
        setValueBalance(inputValue);
    }

    function setValueTypeAccount(e) {
        let valueTypeAccount = e.target.value;
        setTypeAccount(valueTypeAccount);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        console.log(nameAccount);
        console.log(valueBalance);
        console.log(typeAccount);
    }

    return (
        <>
            <div className="py-4 px-2">
                <div className="bg-white rounded shadow mt-7 py-7">
                    <div className="hidden lg:block md:hidden">
                        <div className="px-7 header flex bg-white lg:justify-around md:justify-around justify-start pb-8 pt-2 border-b-[2px] border-slate-100 flex-wrap gap-x-4 ">
                            <a className="cursor-pointer">
                                <div className="flex items-center instance group">
                                    <div className="svg-container group-hover:text-sky-600">
                                        <Wallet/>
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-medium leading-none text-slate-800 group-hover:text-sky-600 ">
                                            Conta
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a className="cursor-pointer">
                                <div className="flex items-center instance group">
                                    <div className="svg-container group-hover:text-sky-600">
                                        <CreditCard/>
                                    </div>
                                    <div className="pl-3 heading-container">
                                        <p className="text-base font-medium leading-none text-slate-800 group-hover:text-sky-600">
                                            Cartão de Crédito
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="mt-10 px-7">
                        <p className="text-xl font-semibold leading-tight text-gray-800">
                            Cadastro de Contas
                        </p>
                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Nome da conta
                                </p>
                                <div className="mb-5">
                                    <input className="font-sans font-normal text-base  w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} type="text" />
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800 pb-2">
                                    Tipo de Conta
                                </p>
                                <div className="relative top-1">
                                    <select className=" border-gray-300 relative flex items-center justify-between w-full h-14 px-5 py-4 rounded outline-none focus:bg-gray-50" onChange={setValueTypeAccount}>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={1}>Conta Corrente</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={2}>Conta Poupança</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Saldo
                                </p>
                                <div className="flex pt-4">
                                    <p className="border flex items-center p-3 bg-color bg-gray-200 rounded-l">R$</p>
                                    <input className="w-full p-3 border border-gray-300 rounded-r outline-none focus:bg-gray-50" type="text" value={valueBalance} onChange={handleValueBalanceChange} />
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

export default FormAccount;
