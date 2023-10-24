import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import authServices from "../../services/authServices";
import FinanceImage from '../../assets/Finance-pana.svg'
import SetCookie from "../../hooks/setCookie.jsx";
import GetCookie from "../../hooks/getCookie.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const isUserAuthorized = GetCookie("user_session");

    useEffect(() => {
        if (isUserAuthorized) {
            return navigate("/dashboard");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await authServices.login(email, pass);

        if (response.token) {
            SetCookie('user_session', response.token);
            return navigate("/dashboard");
        }
    }

    return (
        <div className="relative w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900">
            <div className="flex justify-center items-center h-full basis-5/12">
                <div className="w-3/6">
                    <h1 className="font-sans font-bold text-white text-6xl my-9">
                        Finance Pro
                        <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full"></span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 font-sans font-bold text-gray-300">
                            <label>
                                Email
                                <input className="font-sans w-full p-3 font-bold text-base text-white bg-gray-800 rounded-md ring-inset border-0" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            </label>
                        </div>

                        <div className="mb-5 font-sans font-bold text-gray-300">
                            <label>
                                Senha
                                <input className="font-sans w-full p-3 font-bold text-base text-white bg-gray-800 rounded-md ring-inset border-0" value={pass} onChange={(e) => setPass(e.target.value)} type="password" />
                            </label>
                        </div>

                        {/* <div className="mb-5">
                            <label className="text-white mr-2">
                                <input type="checkbox" className="cursor-pointer rounded-md" /> Remember me
                            </label>
                            <a href="#" className="text-sky-500 hover:text-sky-400">Esqueceu a Senha?</a>
                        </div> */}

                        <div className="mb-5">
                            <input className="font-sans text-lg rounded-md bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 text-white font-bold w-full p-2.5 cursor-pointer" type="submit" value="Entrar" />
                        </div>

                        <div className="mb-5 w-full">
                            <p className="text-white font-bold font-sans">Não possui uma conta? <Link to="/register" className="font-sans font-bold text-sky-500 hover:text-sky-400">Cadastre-se</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="basis-7/12">
                <img
                    src={FinanceImage}
                    className="h-full" />
            </div>
        </div>
    )
}
export default Login;