import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authServices from "../../services/authServices";
import SaveButton from "../../components/button/saveButton";

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const maskEmail = (email) => {
        const [name, domain] = email.split('@');
        const maskedName = name.slice(0, Math.min(name.length, 3)) + '*'.repeat(name.length - 3);
        return `${maskedName}@${domain}`;
    };

    async function getEmail(confirmToken) {
        const userEmail = await authServices.getEmailByTokenConfirm(confirmToken);
        setUserEmail(maskEmail(userEmail.userEmail[0].email));
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const confirmToken = params.get('token');
        getEmail(confirmToken);
        setToken(confirmToken);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultLogin = await authServices.confirmEmail(token);

        if (resultLogin.status === 401) {
            toast.warn(`${resultLogin.data.message}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (resultLogin.status === 500) {
            toast.error('Internal Server Error!', {
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

        return navigate("/");
    }

    return (
        <div className="w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 justify-center items-center">
            <ToastContainer />
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-center font-sans font-bold text-white text-4xl my-6">
                    Finance Pro
                    <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                </h1>
                <h2 className="text-center text-white text-xl font-semibold mb-4">Confirmação de Email</h2>
                <p className="text-center text-white text-sm mb-6">{userEmail}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SaveButton text="Confirmar Email" functionButton={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default ConfirmEmail;
