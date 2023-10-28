import Navbar from "../../components/navbar/index";
import FormCard from "../../components/formCard/index";

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