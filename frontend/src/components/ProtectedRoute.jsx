import {Navigate, Outlet} from "react-router-dom";

export let ROOT = "/";

export const ProtectedRoute = () => {
    let status = window.localStorage.getItem("LOGGED_IN");
    let auth = {token: Boolean(JSON.parse(status))};
    return auth.token ? <Outlet /> : <Navigate to={ROOT} />;
};
