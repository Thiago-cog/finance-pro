import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleGoBack} className='text-white text-base font-sans font-semibold rounded-full w-auto h-10 hover:text-gray-400'>
            <ArrowBigLeft />
        </button>
    );
};

export default BackButton;