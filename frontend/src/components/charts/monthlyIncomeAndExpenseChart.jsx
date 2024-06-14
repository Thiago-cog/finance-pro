import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import accountsServices from "../../services/accountsServices";
import authServices from "../../services/authServices";
import GetCookie from "../../hooks/getCookie";
import Loading from '../loading';

function Index() {
    const [listAllRevenueExpenses, setListAllRevenueExpenses] = useState([]);
    const [disabledLoading, setDisableLoading] = useState(false);
    const token = GetCookie("user_session");

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    async function getAllRevenueExpenses() {
        const decodeToken = await authServices.decodeToken(token);
        const userId = decodeToken.userToken.id;
        const response = await accountsServices.getAllRevenueExpenses(token, userId);
    
        const filledData = fillMissingMonths(response.mergedArray);
        setListAllRevenueExpenses(filledData);
        setDisableLoading(true);
    }
    
    function fillMissingMonths(data) {
        const filledData = [];
        const monthsInYear = Array.from({ length: 12 }, (_, i) => i + 1);
    
        monthsInYear.forEach(month => {
            const foundItem = data.find(item => item.month === month);
    
            if (foundItem) {
                filledData.push(foundItem);
            } else {
                filledData.push({
                    month,
                    total_value_revenue: 0,
                    total_value_expense: 0,
                });
            }
        });
    
        return filledData;
    }
    
    useEffect(() => {
        getAllRevenueExpenses();
    }, []);
    
    const data = listAllRevenueExpenses.map(item => ({
        month: monthNames[item.month - 1],
        receita: item.total_value_revenue,
        despesa: item.total_value_expense,
    }));


    return (
        <>
            <Loading disable={disabledLoading}/>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart className='bg-white rounded-lg'
                    data={data}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="receita" fill="#44e57f" />
                    <Bar dataKey="despesa" fill="#ff3a3a" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
export default Index;