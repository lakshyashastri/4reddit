// import {Navigate} from "react-router-dom";
// import {useAuth} from "../hooks/useAuth";

// export const ProtectedRoute = ({children}) => {
//     const {user} = useAuth();
//     console.log(user);
//     if (!user) {
//         return <Navigate to="/" />;
//     }
//     return children;
// };

import {Navigate, Outlet} from "react-router-dom";
export const ProtectedRoute = () => {
    let status = window.localStorage.getItem("LOGGED_IN");
    let auth = {token: Boolean(JSON.parse(status))};
    return auth.token ? <Outlet /> : <Navigate to="/" />;
};
