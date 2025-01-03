import Navbar from "../../components/navbar/index";
import FormCard from "../formCard/index";

const Cards = () => {
    return (
        <>
            <Navbar/>
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <FormCard />
                </div>
            </div>
        </>
    );
};

export default Cards;