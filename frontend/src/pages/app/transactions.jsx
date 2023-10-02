import {useEffect} from "react";

import Navbar from "./navbar";
import FormAccount from "../../components/account/formAccount";

const Transactions = () => {
    useEffect(() => {
        alert('A página ainda está em desenvolvimento!')
    }, [])
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-screen bg-gray-900">
                <div className=" mt-14">
                    <FormAccount />
                </div>
            </div>
        </>
    );
};

export default Transactions;