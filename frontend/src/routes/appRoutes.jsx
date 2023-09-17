import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../components/auth/login/login";
import Register from "../components/auth/users/register";
import Home from "../components/app/home";
import { PrivateRoute } from "./privateRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" 
                    element={
                        <PrivateRoute redirectTo="/">
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;