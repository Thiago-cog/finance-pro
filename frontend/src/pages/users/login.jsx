import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import authServices from "../../services/authServices";
import FinanceImage from "../../assets/1.png";
import SetCookie from "../../hooks/setCookie.jsx";
import GetCookie from "../../hooks/getCookie.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const isUserAuthorized = GetCookie("user_session");

    useEffect(() => {
        if (isUserAuthorized) {
            return navigate("/home");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await authServices.login(email, pass);

        if (response.token) {
            SetCookie('user_session', response.token);
            return navigate("/home");
        }
    }

    return (
        <div className="relative w-full h-screen flex bg-gray-700">
            <div>
                <img src={FinanceImage} className="h-full" />
            </div>
            <div className="flex justify-center items-center h-full w-3/6">
                <div className="w-3/6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <input className="font-sans w-full p-2.5 border-none font-normal text-base rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </div>

                        <div className="mb-5">
                            <input className="font-sans w-full p-2.5 border-none font-normal text-base rounded-md" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Senha" />
                        </div>

                        <div className="mb-5">
                            <label className="text-white mr-2">
                                <input type="checkbox" className="cursor-pointer rounded-md"/> Remember me
                            </label>
                            <a href="#" className="text-sky-500 hover:text-sky-400">Esqueceu a Senha?</a>
                        </div>

                        <div className="mb-5">
                            <input className="text-lg rounded-md bg-sky-500 hover:bg-sky-400 text-white font-medium w-full p-2.5 cursor-pointer" type="submit" value="Entrar" />
                        </div>

                        <div className="mb-5 w-full">
                            <p className="text-white">Não possui uma conta?  <Link to="/register" className="text-sky-500 hover:text-sky-400">Cadastre-se</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;