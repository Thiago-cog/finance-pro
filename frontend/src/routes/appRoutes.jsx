import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/login/index";
import Register from "../pages/register/index";
import Dashboard from "../pages/dashboard/index";
import Accounts from "../pages/accounts/index";
import Transactions from "../pages/transactions/index";
import Cards from "../pages/cards/index";
import Signature from "../pages/signature/index";
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
                <Route path="/signature" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Signature />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;