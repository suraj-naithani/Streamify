/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");

    const authorizationToken = `Bearer ${token}`;

    const API = "http://localhost:8000";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken('');
        return localStorage.removeItem('token');
    }

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${API}/api/auth/user`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        userAuthentication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        userAuthentication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AuthContext.Provider value={{ storeTokenInLS, authorizationToken, userAuthentication, user, isLoggedIn, LogoutUser, API }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue) {
        throw new Error("UseAuth used Outside of auth provider");
    }
    return authContextValue;
}