import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { CAPTIONS, ROUTES, WINDOW_TYPE } from "./constants";
import { AuthContext } from "./contexts";
import { getMonday, getSunday } from "./util";

/**
 * Get metadata about window
 * @returns {Object} window metadata
 */
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
    const { auth, setAuth } = useContext(AuthContext);


    return { auth, setAuth }
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