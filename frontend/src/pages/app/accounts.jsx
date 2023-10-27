import React from "react";

import Navbar from "./navbar";
import FormAccount from "../../components/account/formAccount";

const Accounts = () => {
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <FormAccount />
                </div>
            </div>
        </>
    );
};

export default Accounts;