import React, { useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import authServices from "../services/userServices.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authServices.registerUser(email, password, fullname);
        console.log(response);
        if(response.status == 201){
            alert(response.message);
            return navigate("/");
        }
    }
    return (
        <div className="container-register">
            <div className="content-box-register">
                <div className="form-box-register">
                    <h2>Cadastro de Usuário</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box-register">
                            <input value={fullname} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome Completo" />
                        </div>
                        <div className="input-box-register">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </div>
                        <div className="input-box-register">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
                        </div>
                        <div className="input-box-register">
                            <input type="submit" value="Cadastrar-se"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;