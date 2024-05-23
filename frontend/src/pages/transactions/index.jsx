import {useEffect} from "react";

import Navbar from "../../components/navbar/index";
import FormTransaction from "../formTransaction/index";

const Transactions = () => {
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <FormTransaction />
                </div>
            </div>
        </>
    );
};

export default Transactions;