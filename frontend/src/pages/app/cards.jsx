import {useEffect} from "react";

import Navbar from "./navbar";
import FormCard from "../../components/account/formCard";

const Cards = () => {
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-full bg-gray-900">
                <div className=" mt-14">
                    <FormCard />
                </div>
            </div>
        </>
    );
};

export default Cards;