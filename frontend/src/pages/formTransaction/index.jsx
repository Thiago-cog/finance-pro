import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, DollarSign, Receipt, GanttChartSquare } from 'lucide-react';
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputMoney } from "../../components/input/inputMoney";
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import SaveButton from "../../components/button/saveButton";
import Loading from "../../components/loading/index";

function FormTransaction() {

    const currentDate = new Date();
    const formatCurrentDate = currentDate.toLocaleDateString('pt-BR');
    const currentYear = currentDate.getFullYear();

    const [value, setValue] = useState(0);
    const [listAccounts, setListAccounts] = useState([]);
    const [listMoviments, setListMoviments] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listCards, setListCards] = useState([]);
    const [accountId, setAccountId] = useState(0);
    const [cardId, setCardId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [activeTab, setActiveTab] = useState('extract');
    const [typeMovement, setTypeMovement] = useState(0);
    const [dateMovement, setDateMovement] = useState("");
    const [monthValue, setMonthValue] = useState(0);
    const [yearValue, setYearValue] = useState(currentYear);
    const [arrayCategories, setArrayCategories] = useState([]);
    const [disabledLoading, setDisableLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const token = GetCookie("user_session");

    const itemsPerPage = 5;
    const arrayYears = [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listMoviments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(listMoviments.length / itemsPerPage);

    for (let i = 0; i < 5; i++) {
        arrayYears.push(currentYear - i);
    }

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const arrayMonth = [
        'Selecione',
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]

    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    async function getMoviments() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const allMoviments = await accountsServices.getAllMoviments(token, userId);
        setListMoviments(allMoviments.data.moviments);
        setDisableLoading(true);
    }

    async function getAccounts() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const allAccounts = await accountsServices.getAccounts(token, userId);
        const selectObject = { "id": 0, "name": "Selecione" };
        allAccounts.data.accounts.unshift(selectObject);
        setListAccounts(allAccounts.data.accounts)
    }

    async function getCards() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const allCards = await accountsServices.getCards(token, userId);
        const selectObject = { "id": 0, "number_card": "Selecione", "name": "" };
        allCards.data.cards.unshift(selectObject);
        setListCards(allCards.data.cards)
    }

    async function getCategories() {
        const resultCategories = await accountsServices.getCategories(token);
        const selectObject = { "id": 0, "name_category": "Selecione" };
        resultCategories.data.categories.unshift(selectObject);
        setListCategories(resultCategories.data.categories);
        setArrayCategories(resultCategories.data.categories);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let movementData = {};

        if (activeTab === 'extract') {
            movementData = {
                "accountsId": accountId,
                "value": value,
                "type_movement": typeMovement,
                "date_movement": dateMovement.split('/').reverse().join('-'),
                "month": monthValue,
                "year": yearValue,
                "category_id": categoryId,
                "activeTab": activeTab
            }
        } else {
            movementData = {
                "cardId": cardId,
                "value": value,
                "type_movement": typeMovement,
                "date_movement": dateMovement.split('/').reverse().join('-'),
                "month": monthValue,
                "year": yearValue,
                "category_id": categoryId,
                "activeTab": activeTab
            }
        }

        const resultCreateMovement = await accountsServices.createMovement(token, movementData);

        if (resultCreateMovement.status === 400) {
            toast.info(`${resultCreateMovement.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (resultCreateMovement.status === 500) {
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
            toast.success(`${resultCreateMovement.data.message}`, {
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
        getAccounts();
        getCards();
        getMoviments();
    }

    useEffect(() => {
        getAccounts();
        getCards();
        getCategories();
        getMoviments();
        setDateMovement(formatCurrentDate);
    }, []);

    function setValueTypeMovement(e) {
        let valueTypeMovement = e.target.value;
        let arrayFindCategories = [];

        arrayCategories.find(function (category) {
            if (category.type_category == valueTypeMovement) {
                arrayFindCategories.push(category);
            }
        });

        const selectObject = { "id": 0, "name_category": "Selecione" };
        arrayFindCategories.unshift(selectObject);
        setTypeMovement(valueTypeMovement);
        setListCategories(arrayFindCategories)
    }

    function setAccountIdSelect(e) {
        let accountId = e.target.value;
        setAccountId(accountId);
    }

    function setCardIdSelect(e) {
        let cardId = e.target.value;
        setCardId(cardId);
    }

    function setValueMonthMovement(e) {
        let monthValue = e.target.value;
        setMonthValue(monthValue);
    }

    function setValueYearMovement(e) {
        let yearValue = parseInt(e.target.value);
        setYearValue(yearValue);
    }

    function setValueDateCurrentMovement(e) {
        let dateValue = e;
        setDateMovement(dateValue);
    }

    function handleBlurDateCurrentMovement(e) {
        if (e == '') {
            setDateMovement(formatCurrentDate);
        }
    }

    function setValueCategories(e) {
        let categoryValue = e.target.value;

        setCategoryId(categoryValue);
    }

    return (
        <>
            <Loading disable={disabledLoading} />
            <ToastContainer />
            <div className="py-4 px-2">
                <div className="relative rounded-lg max-h-96 overflow-y-auto overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome da Conta
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Categoria
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tipo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((moviment, index) => (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                        {moviment.type_movement === "Despesa"
                                            ? <><ArrowDown className="w-4 h-5 text-red-600" /><DollarSign className="w-4 h-5 text-red-600" /></>
                                            : <><ArrowUp className="w-4 h-5 text-lime-600" /><DollarSign className="w-4 h-5 text-lime-600" /></>
                                        } {moviment.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {moviment.name_category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moviment.type_movement}
                                    </td>
                                    <td className="px-6 py-4">
                                        R$ {moviment.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center px-6 py-3 bg-white border-t">
                        <button
                            onClick={() => handleClick(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                            Anterior
                        </button>
                        <span className="mx-2">Página {currentPage} de {totalPages}</span>
                        <button
                            onClick={() => handleClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                            Próxima
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow mt-7 py-7">
                    <div className="hidden lg:block md:hidden">
                        <div className="px-7 header flex bg-white lg:justify-around md:justify-around justify-start pb-8 pt-2 border-b-[2px] border-slate-100 flex-wrap gap-x-2">
                            {activeTab === 'extract' ? (
                                <a className="cursor-pointer text-sky-500" onClick={() => changeTab('extract')}>
                                    <div className="flex items-center instance group">
                                        <div className="svg-container">
                                            <Receipt />
                                        </div>
                                        <div className="pl-3 heading-container">
                                            <p className="text-base font-semibold font-sans leading-none text-sky-500">
                                                Extrato
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <a className="cursor-pointer hover:text-sky-500" onClick={() => changeTab('extract')}>
                                    <div className="flex items-center instance group">
                                        <div className="svg-container">
                                            <Receipt />
                                        </div>
                                        <div className="pl-3 heading-container">
                                            <p className="text-base font-semibold font-sans leading-none text-slate-800 hover:text-sky-500">
                                                Extrato
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            )}
                            {activeTab === 'invoice' ? (
                                <a className="cursor-pointer text-sky-500" onClick={() => changeTab('invoice')}>
                                    <div className="flex items-center instance group">
                                        <div className="svg-container">
                                            <GanttChartSquare />
                                        </div>
                                        <div className="pl-3 heading-container">
                                            <p className="text-base font-semibold font-sans leading-none text-sky-500">
                                                Fatura
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <a className="cursor-pointer hover:text-sky-500" onClick={() => changeTab('invoice')}>
                                    <div className="flex items-center instance group">
                                        <div className="svg-container">
                                            <GanttChartSquare />
                                        </div>
                                        <div className="pl-3 heading-container">
                                            <p className="text-base font-semibold font-sans leading-none text-slate-800 hover:text-sky-500">
                                                Fatura
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                    {activeTab === 'extract' && (
                        <div className="mt-10 px-8">

                            <p className="text-xl font-semibold font-sans text-gray-800">
                                Extrato
                            </p>
                            <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-10">
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
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
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Tipo de Movimentação
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueTypeMovement}>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={0}>Selecione</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={1}>Receita</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={2}>Despesa</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Valor
                                    </p>
                                    <div className="flex pt-4">
                                        <InputMoney
                                            onValue={setValue}
                                            classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                            classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Categorias
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueCategories}>
                                        {listCategories.map((category, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={category.id}>{category.name_category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Data da Movimentação
                                    </p>
                                    <div className="mb-5">
                                        <InputMask mask="99/99/9999" maskPlaceholder={null} className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={dateMovement} onChange={(e) => setValueDateCurrentMovement(e.target.value)} onBlur={(e) => handleBlurDateCurrentMovement(e.target.value)} type="text" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Mês
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueMonthMovement}>
                                        {arrayMonth.map((month, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={index}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Ano
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueYearMovement}>
                                        {arrayYears.map((year, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'invoice' && (
                        <div className="mt-10 px-8">
                            <p className="text-xl font-semibold font-sans text-gray-800">
                                Fatura
                            </p>
                            <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-10">
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Cartão
                                    </p>
                                    <div className="relative top-1">
                                        <select className=" border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setCardIdSelect} value={cardId}>
                                            {listCards.map((card, index) => (
                                                <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={card.id}>{card.number_card + ' - ' + card.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Tipo de Movimentação
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueTypeMovement}>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={0}>Selecione</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={1}>Receita</option>
                                        <option className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={2}>Despesa</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Valor
                                    </p>
                                    <div className="flex pt-4">
                                        <InputMoney
                                            onValue={setValue}
                                            classP="border flex items-center p-3 bg-color bg-gray-200 rounded-l-lg"
                                            classInput="w-[44%] p-3 border border-gray-300 rounded-r-lg outline-none focus:bg-gray-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Categorias
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueCategories}>
                                        {listCategories.map((category, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={index}>{category.name_category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800">
                                        Data da Movimentação
                                    </p>
                                    <div className="mb-5">
                                        <InputMask mask="99/99/9999" maskPlaceholder={null} className="font-sans font-normal text-base w-1/2 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50" value={dateMovement} onChange={(e) => setValueDateCurrentMovement(e.target.value)} onBlur={(e) => handleBlurDateCurrentMovement(e.target.value)} type="text" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Mês
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueMonthMovement}>
                                        {arrayMonth.map((month, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={index}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-base font-semibold font-sans leading-none text-gray-800 ">
                                        Ano
                                    </p>
                                    <select className="border-gray-300 relative flex items-center justify-between w-1/2 h-14  p-3 mt-4 rounded-lg outline-none focus:bg-gray-50" onChange={setValueYearMovement}>
                                        {arrayYears.map((year, index) => (
                                            <option key={index} className="rounded p-3 text-lg leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr className="h-[1px] bg-gray-100 my-14" />
                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                        <SaveButton functionButton={handleSave} text='Salvar' className="bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-lg transform font-bold px-6 py-4 text-white lg:max-w-[144px] w-full" />
                    </div>
                </div>
            </div>

        </>
    );
}

export default FormTransaction;
