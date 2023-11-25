import React from "react";
import SignatureCard from "../../components/signatureCard";
import Navbar from "../../components/navbar";

const Signature = () => {
    return (

        <>
            <Navbar />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className=" mt-14">
                    <SignatureCard
                        description="Perfect for using in a personal website or a client project."
                        buttonText="Choose Personal"
                    >
                        <p className="text-base text-body-color">1 User</p>
                        <p className="text-base text-body-color">All UI components</p>
                        <p className="text-base text-body-color">Lifetime access</p>
                        <p className="text-base text-body-color">Free updates</p>
                        <p className="text-base text-body-color">Use on 1 (one) project</p>
                        <p className="text-base text-body-color">3 Months support</p>
                    </SignatureCard>
                </div>
            </div>
        </>
    );
};

export default Signature;