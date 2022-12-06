import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESPONSE_STATUS } from "./constants";
import { getAccessToken, getUserFromToken } from "./services";
import { getAllCookies } from "./util";

export const AuthContext = createContext(null);

// Provider for the Authentication context
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [token, setToken] = useState({});
    const navigate = useNavigate();

    const obtainAccessToken = () => {
        const { refreshToken } = getAllCookies();
        getAccessToken({ token: refreshToken })
            .then(res => {
                const { status, token: accessToken } = res;
                if(status === RESPONSE_STATUS.SUCCESS) {
                    document.cookie = `accessToken=${accessToken}; max-age=1800;`;
                    console.log('original token', token);
                    setToken({ refreshToken, accessToken });
                }
                else if(status === RESPONSE_STATUS.NOT_VALID_TOKEN) {
                    navigate('/');
                    toast('Session has expired. Please log in again');
                }
                else {
                    navigate('/');
                    toast('Error acquiring access token. Please log in again');
                }
            })
            .catch(() => {
                navigate('/');
                toast('Error acquiring access token. Please log in again');
            });
    };

    useEffect(() => {
        const { refreshToken, accessToken } = getAllCookies();
        if(!refreshToken) navigate('/');
        else if(!accessToken) setToken({ refreshToken });
        else setToken({ accessToken, refreshToken });
    }, []);

    useEffect(() => {
        const { refreshToken, accessToken } = token;
        if(refreshToken && !accessToken) obtainAccessToken();
        else if(refreshToken && accessToken) {
            getUserFromToken({ token: accessToken })
                .then(res => {
                    const { status, user } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) {
                        setAuth(user);
                        navigate('/home/calendar');
                    }
                    else {
                        toast('Error acquiring user info. Please log in again');
                        navigate('/');
                    }
                })
                .catch(() => {
                    toast('Error acquiring user info. Please log in again');
                    navigate('/');
                });
        }
    }, [token]);

    const updateAuth = (authInfo) => {
        setAuth(authInfo);
    }

    const updateToken = (tokenInfo) => {
        setToken(tokenInfo);
        if(tokenInfo?.accessToken) document.cookie = `accessToken=${tokenInfo?.accessToken}; max-age=1800;`
        if(tokenInfo?.refreshToken) document.cookie = `refreshToken=${tokenInfo?.refreshToken}; max-age=259200;`
        if(!tokenInfo?.accessToken && !tokenInfo?.refreshToken) {
            document.cookie = `accessToken= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
            document.cookie = `refreshToken= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
            navigate('/');
        }
    }

    return <AuthContext.Provider value={{ auth, updateAuth, token, updateToken }}>
        {children}
    </AuthContext.Provider>
}