import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const PathContext = React.createContext();

export function PathProvider({ children }) {
    const location = useLocation();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [locationPointer, setLocationPointer] = useState(0);
    const [activeNav, setActiveNav] = useState(false);
    const [pathHistory, setPathHistory] = useState([location.pathname]);

    // const [path, setPath] = useState({
    //     to: location.pathname,
    //     from: location.pathname,
    //     hasBack: false
    // });

    const cannotBack = locationPointer < 1;
    const goBack = () => {
        if (locationPointer < 1) return;
        const route = pathHistory[locationPointer - 1];

        setLocationPointer(prev => prev - 1);
        setActiveNav(true);

        history.push(route);
    };

    const cannotForward = locationPointer >= pathHistory.length - 1
    const goForward = () => {
        if (cannotForward) return
        const route = pathHistory[locationPointer + 1];

        setLocationPointer(prev => prev + 1);
        setActiveNav(true)

        history.push(route);
    };

    useEffect(() => {
        // setPath((prev) => ({
        //     to: location.pathname,
        //     from: prev.to,
        //     // hasBack: !firstRender ? true: false
        // }));
        // setBackNum(prev => prev++);

        setPathHistory(prev => {
            if (!activeNav && prev.length && location.pathname !== prev[prev.length - 1]) {
                prev.push(location.pathname);
            }
            return prev;
        })
        setLoaded(true);

        if (loaded && !activeNav) setLocationPointer(prev => prev + 1);

        setActiveNav(false);

    }, [location])


    return (
        <PathContext.Provider value={{ goBack, goForward, cannotBack, cannotForward }}>
            {children}
        </PathContext.Provider>
    )

};
