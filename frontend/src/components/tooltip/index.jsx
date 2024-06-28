import React, { useState } from 'react';

const Tooltip = ({ text, tooltipText }) => {
    const [mostrarTooltip, setMostrarTooltip] = useState(false);

    return (
        <div className="relative inline-block">
            <span
                className="cursor-pointer"
                onMouseEnter={() => setMostrarTooltip(true)}
                onMouseLeave={() => setMostrarTooltip(false)}
            >
                {text}
            </span>
            {mostrarTooltip && (
                <div className="absolute right-0 bottom-full mb-2 w-64 p-2 text-sm text-black bg-white rounded-lg shadow-lg">
                    <div dangerouslySetInnerHTML={{ __html: tooltipText }} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;