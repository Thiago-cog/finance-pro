import { useState } from "react";

export const InputMoney = ({ onValue, classP, classInput }) => {
    const [valueBalance, setValueBalance] = useState("");

    function handleValueBalanceChange(e) {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");
        inputValue = inputValue.replace(/(\d)(\d{2})$/g, "$1,$2");
        inputValue = inputValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setValueBalance(inputValue);
        
        inputValue = inputValue.replace(/\D/g, "");
        inputValue = parseFloat(inputValue)/100;
        onValue(inputValue);
    }

    return (
        <>
            <p className={classP}>R$</p>
            <input className={classInput} type="text" value={valueBalance} onChange={handleValueBalanceChange} />
        </>
    )
}