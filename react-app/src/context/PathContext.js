import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export const PathContext = React.createContext();

export function PathProvider({ children }) {
    const location = useLocation();
    const history = useHistory();
    const [locationPointer, setLocationPointer] = useState(0);
    const [activeNav, setActiveNav] = useState(false);
    const [pathHistory, setPathHistory] = useState([location.pathname]);

    const user = useSelector(({ session }) => session.user);

    const cannotBack = locationPointer < 1;
    const cannotForward = locationPointer >= pathHistory.length - 1

    const goBack = () => {
        if (locationPointer < 1) return;
        const route = pathHistory[locationPointer - 1];

        setLocationPointer(prev => prev - 1);
        setActiveNav(true);

        history.push(route);
    };

    const goForward = () => {
        if (cannotForward) return
        const route = pathHistory[locationPointer + 1];

        setLocationPointer(prev => prev + 1);
        setActiveNav(true)

        history.push(route);
    };

    const clearHistory = () => {
        setPathHistory(['/']);
        setLocationPointer(0);
    };

    useEffect(() => {
        if (!user || !pathHistory.length) {
            clearHistory();
            return;
        }

        if (!activeNav && location.pathname === pathHistory[locationPointer]) {
            return;
        }

        setPathHistory(prev => {
            if (activeNav) return prev;
            const copy = prev.slice(0, locationPointer + 1)
            if (prev.length) {
                copy.push(location.pathname);
            }
            return copy;
        })
        setLocationPointer(prev => {
            if (activeNav) return prev;
            return prev + 1;
        });

        setActiveNav(false);

    }, [location, user])


    return (
        <PathContext.Provider value={{ goBack, goForward, cannotBack, cannotForward }}>
            {children}
        </PathContext.Provider>
    )

};
