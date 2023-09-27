import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/users/login";
import Register from "../pages/users/register";
import Dashboard from "../pages/app/dashboard";
import Accounts from "../pages/app/accounts";
import Transactions from "../pages/app/transactions";
import Cards from "../pages/app/cards";
import { PrivateRoute } from "./privateRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="/account" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Accounts />
                        </PrivateRoute>
                    }
                />
                <Route path="/transaction" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Transactions />
                        </PrivateRoute>
                    }
                />
                <Route path="/card" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Cards />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;