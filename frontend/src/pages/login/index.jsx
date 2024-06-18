import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
import authServices from "../../services/authServices";
import FinanceImage from '../../assets/Finance-pana.svg'
import SetCookie from "../../hooks/setCookie.jsx";
import GetCookie from "../../hooks/getCookie.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const isUserAuthorized = GetCookie("user_session");

    useEffect(() => {
        if (isUserAuthorized) {
            return navigate("/dashboard");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultLogin = await authServices.login(email, password);

        if (resultLogin.status === 401) {
            toast.warn(`${resultLogin.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (resultLogin.status === 500) {
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
        }

        if (resultLogin.data.token) {
            SetCookie('user_session', resultLogin.data.token);
            return navigate("/dashboard");
        }

    }

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-br from-gray-950 to-gray-900">
            <ToastContainer />
            <div className="flex justify-center items-center h-full md:basis-5/12 p-4">
                <div className="w-full max-w-md">
                    <h1 className="font-sans font-bold text-white text-4xl md:text-6xl my-6 md:my-9">
                        Finance Pro
                        <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="font-sans font-bold text-gray-300 block text-sm leading-6">
                                Email
                                <input className="font-sans w-full p-3 font-bold text-base text-white bg-gray-800 rounded-lg ring-inset border-0 mt-1" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            </label>
                        </div>

                        <div className="mb-5">
                            <label className="font-sans font-bold text-gray-300 block text-sm leading-6">
                                Senha
                                <div className="relative mt-1">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="bg-gray-800 block w-full rounded-lg border-0 py-3 text-white ring-inset"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
                                    </button>
                                </div>
                            </label>
                        </div>

                        <div className="mb-5">
                            <input className="font-sans text-lg rounded-lg bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 text-white font-bold w-full p-2.5 cursor-pointer" type="submit" value="Entrar" />
                        </div>
                        <div className="mb-5">
                            <p className="text-white font-bold font-sans">Esqueceu a Senha? <Link to="/forgot-password" className="font-sans font-bold text-sky-500 hover:text-sky-400">Clique aqui</Link></p>
                        </div>

                        <div className="mb-5 w-full">
                            <p className="text-white font-bold font-sans">Não possui uma conta? <Link to="/register" className="font-sans font-bold text-sky-500 hover:text-sky-400">Cadastre-se</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex md:basis-7/12">
                <img
                    src={FinanceImage}
                    className="h-full w-full object-cover"
                    alt="Finance Image"
                />
            </div>
        </div>
    )
}

export default Login;
