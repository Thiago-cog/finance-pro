import { useState, useEffect } from "react";
import authServices from "../../services/authServices.js";
import Navbar from "../../components/navbar";
import Switcher3 from "../../components/toggle/index.jsx";
import SaveButton from "../../components/button/saveButton";
import GetCookie from "../../hooks/getCookie.jsx";
import InputMask from 'react-input-mask';

function Profile() {
    const [fullname, setFullName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const token = GetCookie("user_session");

    async function getUserData() {
        try {
            const response = await authServices.decodeToken(token);

            setFullName(response.userToken.fullname);
            setName(response.userToken.fullname);
            setEmail(response.userToken.email);
            setPhone(response.userToken.phone);

        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;

        const resultUpdateUser = await authServices.updateUser(email, password, fullname, phone, userId, token);

    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <Navbar />

            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className="w-full bg-white rounded-lg mt-14 p-8 sm:p-14">
                    <h1 role="heading" aria-label="profile information" className="focus:outline-none text-2xl sm:text-3xl font-bold text-gray-800 mt-4 sm:mt-12">
                        Perfil
                    </h1>
                    <p role="contentinfo" className="focus:outline-none text-sm font-light leading-tight text-gray-600 mt-2 sm:mt-4">
                        Bem-vindo {name}
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800 font-semibold">Nome</label>
                            <input type="name" className="w-full sm:w-64 text-sm font-medium leading-none text-gray-800 p-3 border rounded-lg border-gray-200" value={fullname} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800 font-semibold">Email</label>
                            <input type="email" className="w-full sm:w-64 text-sm font-medium leading-none text-gray-800 p-3 border rounded-lg border-gray-200" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800 font-semibold">Telefone</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                placeholder="(99) 99999-9999"
                                className="w-full sm:w-64 text-sm font-medium leading-none text-gray-800 p-3 border rounded-lg border-gray-200"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></InputMask>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-3 text-sm leading-none text-gray-800 font-semibold">Senha</label>
                            <input type="password" className="w-full sm:w-64 text-sm font-medium leading-none text-gray-800 p-3 border rounded-lg border-gray-200" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <h1 role="heading" aria-label="profile information" className="focus:outline-none text-2xl sm:text-3xl font-bold text-gray-800 mt-8 sm:mt-12">
                        Integrações
                    </h1>
                    <p role="contentinfo" className="focus:outline-none text-sm font-light leading-tight text-gray-600 my-4">
                        Futuras integrações que haverá na plataforma
                    </p>
                    <div className="mb-8 sm:mb-20">
                        <Switcher3 text={"B3"} />
                        <Switcher3 text={"Open Finance"} />
                    </div>
                    <SaveButton text="Salvar" functionButton={handleSave} />
                </div>
            </div>
        </>
    );
}

export default Profile;
