import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../auth/login/login";
import Register from "../auth/users/register";
import Home from "./home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;