import {
    BrowserRouter,
    Routes,
    Route,
    useRoutes,
    Navigate
} from "react-router-dom";

import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import NotFound from "./pages/notFound";
import {ProtectedRoute} from "./components/ProtectedRoute";

export default function App() {
    let loggedIn = JSON.parse(window.localStorage.getItem("LOGGED_IN"));

    return (
        <BrowserRouter basename="/">
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
