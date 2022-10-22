import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// Provider for the Authentication context
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    return <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}