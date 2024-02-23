import { useEffect } from "react";
import { useAuth } from "../../context/auth"
import { Navigate } from "react-router-dom";

const SignOut = () => {
    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);

    return (
        <Navigate to='/login' />
    )
}

export default SignOut