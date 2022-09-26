import { useContext, useEffect, useState } from "react"
import { WINDOW_TYPE } from "./constants";

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