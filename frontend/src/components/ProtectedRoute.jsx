import {useState, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {postTo} from "../helpers";

export let ROOT = "/";

export const ProtectedRoute = () => {
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem("token");
            console.log(token);
            let res = await postTo("/login/auth", {token});
            res = await res.json();

            if (!res.success) {
                setSuccess(false);
            } else {
                setSuccess(true);
            }
        })();
    }, []);

    if (success) {
        return <Outlet />;
    }
    return <Navigate to={ROOT} />;
};
