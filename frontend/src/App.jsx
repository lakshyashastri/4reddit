import {
    BrowserRouter,
    Routes,
    Route,
    useRoutes,
    Navigate
} from "react-router-dom";

import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import {ProtectedRoute, ROOT} from "./components/ProtectedRoute";
import NotFound from "./pages/notFound";

export default function App() {
    let loggedIn = JSON.parse(window.localStorage.getItem("LOGGED_IN"));

    return (
        <BrowserRouter basename={ROOT}>
            <Routes>
                <Route
                    path="/"
                    element={
                        !loggedIn ? <LoginPage /> : <Navigate to="/u/admin" />
                    }
                />
                <Route element={<ProtectedRoute />}>
                    <Route path="/u/:username" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
