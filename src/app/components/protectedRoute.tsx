import React from 'react';
import {useSelector} from "react-redux";
import {getToken} from "../service/TokenServices";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {
    const isAuthenticated = useSelector(getToken());
    if (!isAuthenticated) return <Navigate to='/login' />;
    return children;
};

export default ProtectedRoute;