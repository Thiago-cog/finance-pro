import React from "react";

import Navbar from "./navbar";
import Index from "../../components/account/formAccount";

const Accounts = () => {
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-full bg-gray-900">
                <div className=" mt-14">
                    <Index />
                </div>
            </div>
        </>
    );
};

export default Accounts;