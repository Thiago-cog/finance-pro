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

    useEffect(() => {

    });

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
        <div className="w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 justify-center items-center pb-64">
            <ToastContainer />
            <div className="text-center">
                <h1 className="font-sans font-bold text-white text-6xl my-6">
                    Finance Pro
                    <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                </h1>
                <h2 className="font-sans font-bold text-white text-3xl mb-12">{userEmail}</h2>
                <SaveButton text="Confirmar Email" functionButton={handleSubmit} />
            </div>
        </div>
    )
}
export default ConfirmEmail;