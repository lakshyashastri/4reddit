import {useState, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {postTo} from "../helpers";

export let ROOT = "/";

export const ProtectedRoute = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem("token");

            let res = await postTo("/login/auth", {token});
            res = await res.json();

            if (res.success) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        })();
    }, []);

    if (authenticated) {
        return children;
    }
    return <Navigate to={ROOT} />;
};
