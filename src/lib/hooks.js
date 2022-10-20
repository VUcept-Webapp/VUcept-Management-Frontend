import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { CAPTIONS, ROUTES, WINDOW_TYPE } from "./constants";
import { AuthContext } from "./contexts";
import { getMonday, getNextMonday, getPrevMonday, getSunday } from "./util";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window?.innerWidth ?? 1200,
        height: window?.innerHeight ?? 800,
    });

    const onWindowResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    const isMobile = Math.min(window.screen.width, window.screen.height) < 768;
    if(isMobile) {
        return {
            width: window.screen.width,
            height: window.screen.height,
            type: WINDOW_TYPE.MOBILE
        }
    }
    
    return { 
        ...windowSize,
        type: WINDOW_TYPE.WEB
    };
}

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
        // const nextWeek = new Date(current.getTime() + (7 * 24 * 60 * 60 * 1000));
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

export const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);


    return { auth, setAuth }
}