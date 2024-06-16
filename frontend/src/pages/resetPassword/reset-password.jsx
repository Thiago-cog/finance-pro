import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import SaveButton from "../../components/button/saveButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authServices.resetPassword(email);

        if (result.status === 400) {
            toast.warn(`${result.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (result.status === 500) {
            toast.error(`Internal Server Error! ${result.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success(`${result.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        setTimeout(() => {
            return navigate("/");
        }, 2500);
    };

    return (
        <div className="w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 justify-center items-center pb-64">
            <ToastContainer />
            <div className="text-center">
                <h1 className="font-sans font-bold text-white text-6xl my-6">
                    Finance Pro
                    <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                </h1>
                <h3 className="text-white text-2xl font-bold mb-20">Recuperação de senha</h3>
                <div className="mb-5 font-sans font-bold text-gray-300">
                    <label htmlFor="password" className="font-sans font-bold text-gray-300 block text-sm leading-6">
                        Nova Senha
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
                    </label>
                </div>
                <div className="mb-5 font-sans font-bold text-gray-300">
                    <label htmlFor="confirmPassword" className="font-sans font-bold text-gray-300 block text-sm leading-6">
                        Confirmar Senha
                        <div className="relative">
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="bg-gray-800 block w-full rounded-lg border-0 py-3 text-white ring-inset"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showConfirmPassword ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
                            </button>
                        </div>
                    </label>
                </div>
                <SaveButton text="Salvar" functionButton={handleSubmit} />
            </div>
        </div>
    );
};

export default ResetPassword;
