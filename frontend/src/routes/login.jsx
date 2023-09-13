import React, { useState } from "react";
import "../styles/login.css";
import authServices  from "../services/authServices.js";
import FinanceImage from "../assets/Finance Pro.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authServices.login(email, pass);
        if(response.token){
            return navigate("/test");
        }
    }

    return (
        <div className="container-login">
            <div className="img-box">
                <img src={FinanceImage}/>
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
                                <input type="checkbox"/> Remember me
                            </label>
                            <a href="#">Esqueceu a Senha?</a>
                        </div>

                        <div className="input-box">
                            <input type="submit" value="Entrar"/>
                        </div>

                        <div className="input-box">
                        <p>Não possui uma conta? <a href="#">Cadastre-se</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;