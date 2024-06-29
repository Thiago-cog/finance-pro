import { useState } from "react";

export const InputMoney = ({ onValue, classP, classInput }) => {
    const [valueBalance, setValueBalance] = useState("");

    function handleValueBalanceChange(e) {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue === "") {
            setValueBalance("");
            onValue(0);
            return;
        }

        const billionLimit = 100000000; 
        let numericValue = parseInt(inputValue, 10);
        if (numericValue > billionLimit) {
            numericValue = billionLimit;
        }


        let stringValue = numericValue.toString().padStart(3, "0");
        let integerPart = stringValue.slice(0, -2);
        let decimalPart = stringValue.slice(-2);

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let formattedValue = integerPart + ',' + decimalPart;

        setValueBalance(formattedValue);

        onValue(numericValue / 100);
    }

    return (
        <>
            <p className={classP}>R$</p>
            <input 
                className={classInput} 
                type="text" 
                value={valueBalance} 
                onChange={handleValueBalanceChange} 
            />
        </>
    )
}