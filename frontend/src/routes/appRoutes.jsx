import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/users/login";
import Register from "../pages/users/register";
import Dashboard from "../pages/app/dashboard";
import Accounts from "../pages/app/accounts";
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
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;