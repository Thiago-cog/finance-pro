import React, { useState } from "react";
import "../styles/login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit} className="login-form">
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="exemplo@email.com" />
                <label>Senha</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="password" id="password" />
                <button type="submit" className="btn-link">Entrar</button>
            </form>
        </div>
    )
}