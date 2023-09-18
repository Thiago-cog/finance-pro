import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authServices from "../../services/userServices";
import Logo from "../../assets/2-removebg-preview.png"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authServices.registerUser(email, password, fullname);
        if (response.status == 201) {
            alert(response.message);
            return navigate("/");
        }
    }
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center bg-gray-700">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-28 w-28"
                    src={Logo}
                    alt="Finance Pro"
                />
                <p className="font-sans mt-4 text-center text-4xl font-bold leading-9 tracking-tight text-white">
                    Cadastro de Usuário
                </p>
            </div>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="font-sans block text-sm font-medium leading-6 text-white">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                value={fullname} 
                                onChange={(e) => setName(e.target.value)}
                                id="fullname"
                                name="fullname"
                                type="text"
                                autoComplete="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="font-sans block text-sm font-medium leading-6 text-white">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="font-sans block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                        >
                            Cadastre-se
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;