import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import authServices from "../../services/authServices";
import Logo from "../../assets/2-removebg-preview.png";
import RegisterImage from "../../assets/Login-rafiki.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await authServices.registerUser(email, password, fullname);
        if (response.status == 201) {
            toast.success(`${response.data.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setTimeout(() => {
                return navigate("/");
            }, 2500);
        }
    }
    return (
        <div className=" w-full h-screen flex bg-gradient-to-tr from-gray-950 to-gray-900">
            <ToastContainer />
            <div className="flex justify-center items-center h-full basis-5/12">
                <div className="w-3/6">
                    <img
                        className="mx-auto h-24 w-24"
                        src={Logo}
                        alt="Finance Pro"
                    />
                    <h1 className="font-sans font-bold text-white text-6xl my-9">
                        Cadastre-se
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="font-sans font-bold text-gray-300 block text-sm  leading-6">
                                Nome
                                <input
                                    value={fullname}
                                    onChange={(e) => setName(e.target.value)}
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="bg-gray-800 block w-full rounded-lg border-0 py-3 text-white ring-inset"
                                />
                            </label>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="font-sans font-bold text-gray-300 block text-sm leading-6">
                                Email
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="bg-gray-800 block w-full rounded-lg border-0 py-3 text-white ring-inset"
                                />
                            </label>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-300">
                                Senha
                            </label>
                            <div className="relative">
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
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="font-sans font-bold text-lg flex w-full justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 px-3 p-2.5 leading-6 text-white"
                            >
                                Cadastre-se
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="basis-7/12">
                <img
                    src={RegisterImage}
                    className="h-full" />
            </div>
        </div>
    )
}

export default Register;