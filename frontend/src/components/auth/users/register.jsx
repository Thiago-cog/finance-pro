import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../../services/userServices";

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
        <div className="">
            <div className="">
                <div className="">
                    <h2>Cadastro de Usuário</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <input value={fullname} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome Completo" />
                        </div>
                        <div className="">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </div>
                        <div className="">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
                        </div>
                        <div className="">
                            <input type="submit" value="Cadastrar-se"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;