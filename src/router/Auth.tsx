import React from 'react';
import { Navigate } from "react-router-dom";
import { getToken } from 'src/api/token';
interface AuthProps {
    element: React.ReactElement
}
export default (props: AuthProps) => {
    const { element } = props;
    if(!getToken()) {
        return <Navigate to={'/'}></Navigate>;
    }
    return element
}
