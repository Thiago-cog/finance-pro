import React from "react";

export const CreditCard = () => {
    return (
        <div className="w-[425px] h-[270px] bg-gradient-to-tr rounded-2xl flex content-center items-center justify-center from-[#9C2CF3] to-[#3A49F9]">
            <div className="p-8 w-full h-full">
                <div className="relative w-full h-full">
                    <image
                        className="absolute"
                        alt=""

                        width={70}
                        height={24}
                    />
                    <div className="flex flex-col w-full h-full justify-end gap-4">
                        <p className="text-2xl text-white font-sans font-bold">4242 4242 4242 4242</p>
                        <div className="flex gap-28">
                            <p className="text-lg uppercase text-white font-sans font-bold">John Doe</p>
                            <p className="text-lg uppercase text-white font-sans font-bold">10/24</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};