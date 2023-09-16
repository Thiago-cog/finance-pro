import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import authServices  from "../../../services/authServices.js";
import FinanceImage from "../../../assets/1.png";
import cookies from "../../../services/cookies.js"

import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await authServices.login(email, pass);

        if(response.token){
            cookies.setCookie('user_session', response.token);
            return navigate("/");
        }
    }

    return (
        <div className="container-login bg-gray-700">
            <div className="img-box">
                <img src={FinanceImage} className="h-full"/>
            </div>
            <div className="content-box">
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"/>
                        </div>

                        <div className="input-box">
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Senha"/>
                        </div>

                        <div className="remember">
                            <label>
                                <input className="text-white" type="checkbox"/> Remember me
                            </label>
                            <a href="#">Esqueceu a Senha?</a>
                        </div>

                        <div className="input-box">
                            <input type="submit" value="Entrar"/>
                        </div>

                        <div className="input-box">
                        <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;