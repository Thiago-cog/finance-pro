import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    const [warningMessage, setWarningMessage] = useState('');
    const [token, setToken] = useState(null);
    const location = useLocation();

    async function validateToken(passwordRefreshToken) {
        const validate = await authServices.validateToken(passwordRefreshToken);
        if (validate.status === 400) {
            toast.warn(`${validate.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (validate.status === 401) {
            toast.warn(`${validate.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return navigate("/");
        }

        setToken(passwordRefreshToken);
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const passwordRefreshToken = params.get('token');
        validateToken(passwordRefreshToken);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setWarningMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            toast.warn('As senhas não coincidem. Por favor, tente novamente.', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const result = await authServices.resetPassword(password, token);

        if (result.status === 400) {
            toast.warn(`${result.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
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
                theme: "light",
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
                theme: "light",
            });
        }

        setTimeout(() => {
            return navigate("/");
        }, 2500);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 6) {
            setWarningMessage('A senha deve ter pelo menos 6 caracteres.');
        } else {
            setWarningMessage('');
        }
    };

    return (
        <div className="w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 justify-center items-center">
            <ToastContainer />
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-center font-sans font-bold text-white text-4xl my-6">
                    Finance Pro
                    <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                </h1>
                <h3 className="text-center text-white text-xl font-semibold mb-4">Recuperação de senha</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Nova Senha
                        </label>
                        <div className="relative mt-1">
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
                            </button>
                        </div>
                        {warningMessage && (
                            <p className="text-red-500 text-sm mt-2">{warningMessage}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                            Confirmar Senha
                        </label>
                        <div className="relative mt-1">
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showConfirmPassword ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
                            </button>
                        </div>
                        {warningMessage && (
                            <p className="text-red-500 text-sm mt-2">{warningMessage}</p>
                        )}
                    </div>
                    <div>
                        <SaveButton text="Salvar" functionButton={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
