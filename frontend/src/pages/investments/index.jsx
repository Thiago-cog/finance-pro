import React from "react";
import Navbar from "../../components/navbar";
import Index from "../../components/investments-dashboard/index";

const Investments = () => {
    return (

        <>
            <Navbar />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <Index/>
                </div>
            </div>
        </>
    );
};

export default Investments;