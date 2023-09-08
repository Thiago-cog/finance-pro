import React, { useState } from "react";
import "../styles/login.css";
import authServices  from "../services/authServices.js";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authServices.login(email, pass);
        if(response.token){
            alert("Usuário Logado com sucesso");
        }
    }

    return (
        <div className="container-login">
            <div className="img-box">
                <img src="static/Finance.png"/>
            </div>
            <div className="content-box">
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span>Email</span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="@mail.com"/>
                        </div>

                        <div className="input-box">
                            <span>Senha</span>
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password"/>
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
                        <p>Não Tem Uma Conta? <a href="#">Inscrever-se</a></p>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="auth-form">
            <form onSubmit={handleSubmit} className="login-form">
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="exemplo@email.com" />
                <label>Senha</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="password" id="password" />
                <button type="submit" className="btn-link">Entrar</button>
            </form>
        </div> */}
        </div>
    )
}