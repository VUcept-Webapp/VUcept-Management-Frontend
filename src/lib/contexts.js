import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

// Provider for the Authentication context
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        setAuth({ 
            email: sessionStorage.getItem('email') || "",
            name: sessionStorage.getItem('name') || "",
            visions: sessionStorage.getItem('visions') || "",
            type: sessionStorage.getItem('type') || "",
        });
    }, []);

    const updateAuth = (inputs) => {
        setAuth(inputs);
        if(!inputs?.email) sessionStorage.clear();
        else {
            sessionStorage.setItem('email', inputs?.email);
            sessionStorage.setItem('name', inputs?.name);
            sessionStorage.setItem('visions', inputs?.visions);
            sessionStorage.setItem('type', inputs?.type);
        }
    }


    return <AuthContext.Provider value={{ auth, updateAuth }}>
        {children}
    </AuthContext.Provider>
}