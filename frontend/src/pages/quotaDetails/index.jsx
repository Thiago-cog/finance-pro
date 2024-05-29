import React from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../components/navbar";
import QuoteDetailsDashboard from "../quotaDetailsDashboard/index"

const Investments = () => {
    const { stock } = useParams();
    return (

        <>
            <Navbar />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <QuoteDetailsDashboard stock={ stock }/>
                </div>
            </div>
        </>
    );
};

export default Investments;