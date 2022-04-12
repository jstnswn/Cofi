import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export const PathContext = React.createContext();

export function PathProvider({ children }) {
    const location = useLocation();
    const history = useHistory();
    // const [loaded, setLoaded] = useState(false);
    const [locationPointer, setLocationPointer] = useState(0);
    const [activeNav, setActiveNav] = useState(false);
    const [pathHistory, setPathHistory] = useState([location.pathname]);

    const user = useSelector(({ session }) => session.user);
    // if (!user) return null;

    // const [path, setPath] = useState({
    //     to: location.pathname,
    //     from: location.pathname,
    //     hasBack: false
    // });
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
        // setActiveNav(true);
    };

    useEffect(() => {
        if (!user || !pathHistory.length) {
            clearHistory();
            return;
        }

        if (location.pathname === pathHistory[locationPointer] || activeNav) {
            console.log('returned')
            return;
        }

        setPathHistory(prev => {
            const copy = [...prev];
            if (prev.length) {
                copy.splice(locationPointer + 1, 0, location.pathname)
            }
            return copy;
        })

        setLocationPointer(prev => {
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
