import React from 'react';
import Tooltip from '../tooltip/index';
import { Info } from 'lucide-react';

export default function GridCardDetails({ text, value, tooltipText }) {
    return (
        <div className="relative rounded-lg m-4 border-2 p-4 h-28 flex flex-col justify-between">
            <p className="text-xl text-gray-500 font-sans font-medium">
                {text}
            </p>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold font-sans text-black">
                    {value}
                </p>
                <div className="absolute bottom-4 right-4">
                    <Tooltip text={<Info/>} tooltipText={tooltipText} />
                </div>
            </div>
        </div>
    );
}
