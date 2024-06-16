import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/authServices";
import SaveButton from "../../components/button/saveButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authServices.forgotPassword(email);

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
    }

    return (
        <div className="w-full h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 justify-center items-center pb-64">
            <ToastContainer />
            <div className="text-center">
                <h1 className="font-sans font-bold text-white text-6xl my-6">
                    Finance Pro
                    <span className="inline-block w-3 h-3 bg-gradient-to-tr from-indigo-600 via-cyan-600 to-emerald-500 rounded-full ml-2"></span>
                </h1>
                <h3 className="text-white text-2xl font-bold mb-20"> Recuperação de senha</h3>
                <div className="mb-5 font-sans font-bold text-gray-300">
                    <label>
                        Email
                        <input className="font-sans w-full p-3 font-bold text-base text-white bg-gray-800 rounded-lg ring-inset border-0" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </label>
                </div>
                <SaveButton text="Enviar Email" functionButton={handleSubmit} />
            </div>
        </div>
    )
}
export default ForgotPassword;