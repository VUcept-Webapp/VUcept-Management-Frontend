import { useCallback, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { CAPTIONS, ROUTES, WINDOW_TYPE } from "./constants";
import { AuthContext } from "./contexts";
import { appendParams, getMonday, getSunday } from "./util";

/**
 * Get metadata about window
 * @returns {Object} window metadata
 */
 export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
        height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
    });

    const onWindowResize = () => {
        setWindowSize({
            width:Math.min(window?.innerWidth || 0, window?.screen?.width || 0),
            height: Math.min(window?.innerHeight || 0, window?.screen?.height || 0)
        });
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);
    
    return { 
        ...windowSize,
        type: windowSize.width < 450 ? WINDOW_TYPE.MOBILE : WINDOW_TYPE.WEB
    };
}

/**
 * Get caption for each home page
 * @returns {String} caption text
 */
export const useCaption = () => {
    const { pathname } = useLocation();
    switch(pathname) {
        case(ROUTES.CALENDAR): return CAPTIONS.HOME;
        case(ROUTES.LOG_VISIONS): return CAPTIONS.LOG_VISIONS_ATTENDANCE;
        case(ROUTES.VISIONS_ASSIGNMENT): return CAPTIONS.VISIONS_ASSIGNMENT;
        case(ROUTES.FIRST_YEAR_ATTENDANCE): return CAPTIONS.FIRST_YEAR_ATTENDANCE;
        case(ROUTES.VUCEPTOR_ATTENDANCE): return CAPTIONS.VUCEPTOR_ATTENDANCE;
        case(ROUTES.USER_MANAGEMENT): return CAPTIONS.USER_MANAGEMENT
        default: return CAPTIONS.HOME;
    }
}

/**
 * States related to calendar week
 * @returns {Object} states and updaters
 */
export const useWeek = () => {
    const [currentWeek, setCurrentWeek] = useState({});

    useEffect(() => {
        const firstDay = getMonday(new Date());
        const lastDay = getSunday(new Date());
        setCurrentWeek({
            startYear: firstDay.getFullYear(),
            startMonth: firstDay.getMonth() + 1,
            startDate: firstDay.getDate(),
            endYear: lastDay.getFullYear(),
            endMonth: lastDay.getMonth() + 1,
            endDate: lastDay.getDate(),
        });
    }, []);

    const setPrevWeek = () => {
        const { startYear, startMonth, startDate } = currentWeek;
        const current = new Date(startYear, startMonth - 1, startDate);
        const lastWeek = new Date(current.getTime() - (7 * 24 * 60 * 60 * 1000));
        const firstDay = getMonday(lastWeek);
        const lastDay = getSunday(lastWeek);
        setCurrentWeek({
            startYear: firstDay.getFullYear(),
            startMonth: firstDay.getMonth() + 1,
            startDate: firstDay.getDate(),
            endYear: lastDay.getFullYear(),
            endMonth: lastDay.getMonth() + 1,
            endDate: lastDay.getDate(),
        });
    }

    const setNextWeek = () => {
        const { startYear, startMonth, startDate } = currentWeek;
        const nextWeek = new Date(startYear, startMonth - 1, startDate);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const firstDay = getMonday(nextWeek);
        const lastDay = getSunday(nextWeek);
        setCurrentWeek({
            startYear: firstDay.getFullYear(),
            startMonth: firstDay.getMonth() + 1,
            startDate: firstDay.getDate(),
            endYear: lastDay.getFullYear(),
            endMonth: lastDay.getMonth() + 1,
            endDate: lastDay.getDate(),
        });
    }

    return { currentWeek, setCurrentWeek, setPrevWeek, setNextWeek }
}

/**
 * Update authentication context
 * @returns {Object} states and updates of the context
 */
export const useAuth = () => {
    const { auth, updateAuth, token, updateToken } = useContext(AuthContext);
    return { auth, updateAuth, token, updateToken };
}

/**
 * Use JWT authenticated requests
 * @returns {Object} states and updates of the context
 */
export const useAuthenticatedRequest = () => {
    const { token } = useAuth();
    
    const get = useCallback(({ url, params = {}, onResolve = () => undefined, onReject = () => undefined }) => {
        if(!token?.accessToken) return;
        return fetch(appendParams(process.env.REACT_APP_HOST_URL + url, params), {
            method: 'GET',
            ...(token?.accessToken && { headers: { 'Authorization': 'Bearer ' + token?.accessToken, } }),
        }).then(response => response.json())
        .then(res => onResolve(res))
        .catch(err => onReject(err));
    }, [token]);

    const post = useCallback(({ url, params = {}, onResolve = () => undefined, onReject = () => undefined }) => {
        if(!token?.accessToken) return;
        return fetch(appendParams(process.env.REACT_APP_HOST_URL + url, params), {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...(token?.accessToken && { 'Authorization': 'Bearer ' + token?.accessToken }),
            },
            body: JSON.stringify(params),
        }).then(response => response.json())
        .then(res => onResolve(res))
        .catch(err => onReject(err));
    }, [token]);

    return { get, post };
}

/**
 * Custom event for clicking outside of elements
 * @param {Array} refs array of refs of elements to be excluded from the event
 * @param {Function} handler event handler
 */
export const useOnClickOutside = (refs, handler) => {
    useEffect(() => {
        const listener = (event) => {
            let outside = true;
            for(const ref of refs) {
                if (ref?.current?.contains(event.target)) {
                    outside = false;
                    return;
                }
            }
            if(outside) handler(event);
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, [refs, handler]);
  }