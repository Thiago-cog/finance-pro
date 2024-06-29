import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Landmark, CreditCard, ArrowLeftRight, TrendingUp, User, Wallet, CandlestickChart } from 'lucide-react';

import Logo from "../../assets/2-removebg-preview.png";
import GetCookie from "../../hooks/getCookie.jsx";
import RemoveCookie from "../../hooks/removeCookie.jsx";
import authServices from "../../services/authServices.js";

const Navbar = () => {
    const [name, setName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function getUser() {
        const token = GetCookie("user_session");
        try {
            const response = await authServices.decodeToken(token);
            setName(response.userToken.fullname);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    function logout() {
        RemoveCookie("user_session");
        navigate("/");
    }

    function dashboard() {
        navigate("/dashboard");
    }

    function accounts() {
        navigate("/account");
    }

    function transaction() {
        navigate("/transaction");
    }

    function card() {
        navigate("/card");
    }

    function investments() {
        navigate("/investments");
    }

    function profile() {
        navigate("/profile");
    }

    function wallet() {
        navigate("/investments-wallet");
    }

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-br from-gray-950 to-gray-900">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={() => document.getElementById('logo-sidebar').classList.toggle('-translate-x-full')}
                            >
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/dashboard" className="flex ml-2 md:mr-24">
                                <img src={Logo} className="h-10 w-10 mr-3" />
                                <span className="self-center text-xl font-sans font-bold sm:text-2xl whitespace-nowrap dark:text-white">Finance Pro</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <button onClick={profile}>
                                    <div className="flex">
                                        <span className="text-white pr-2 pt-1 font-sans font-bold text-base">{name}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-gray-200 sm:translate-x-0 dark:bg-gradient-to-r from-gray-950 to-gray-900" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gradient-to-r from-gray-950 to-gray-900">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={dashboard} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3 font-bold font-sans">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <TrendingUp className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Investimentos</span>
                            </button>
                            {isDropdownOpen && (
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <button onClick={wallet} className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group">
                                            <Wallet className="ml-8 mr-2 w-5 h-5 text-gray-400"/>
                                            <span className="whitespace-nowrap font-sans">Carteira</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={investments} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <CandlestickChart className="ml-8 mr-2 w-5 h-5 text-gray-400"/>
                                            <span className="whitespace-nowrap font-sans">Homebreak</span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={profile} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <User className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Perfil</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={transaction} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <ArrowLeftRight className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Transações</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={accounts} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Landmark className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Contas</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={card} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <CreditCard className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Cartões</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold font-sans">Sair</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Navbar;
