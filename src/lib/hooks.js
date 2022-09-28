import { useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { CAPTIONS, ROUTES, WINDOW_TYPE } from "./constants";

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
        case(ROUTES.VISION_GROUPING): return null;
        case(ROUTES.FIRST_YEAR_ATTENDANCE): return CAPTIONS.FIRST_YEAR_ATTENDANCE;
        case(ROUTES.VUCEPTOR_ATTENDANCE): return CAPTIONS.VUCEPTOR_ATTENDANCE;
        case(ROUTES.USER_MANAGEMENT): return CAPTIONS.USER_MANAGEMENT
        default: return CAPTIONS.HOME;
    }
}