import React from "react";
import { Navigate} from "react-router-dom";
import GetCookie from "../hooks/getCookie.jsx";

export function PrivateRoute({ children, redirectTo }){
    const isUserAuthorized = GetCookie("user_session");
    
    return isUserAuthorized ? children : <Navigate to={redirectTo}/>;
}