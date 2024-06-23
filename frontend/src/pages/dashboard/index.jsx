import React from "react";
import Navbar from "../../components/navbar/index";
import AllStatus from "../../components/dashbord/allStatus";
import RevenueChart from "../../components/charts/revenueChart";
import ExpenseChart from "../../components/charts/expenseChart";
import MonthlyIncomeAndExpenseChart from "../../components/charts/monthlyIncomeAndExpenseChart";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="p-4 sm:ml-64 h-auto min-h-screen bg-gray-900">
                <div className="mt-14">
                    <AllStatus />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="rounded bg-gray-900">
                            <RevenueChart />
                        </div>
                        <div className="rounded bg-gray-900">
                            <ExpenseChart />
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-96 mb-4 rounded bg-gray-900">
                        <MonthlyIncomeAndExpenseChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
