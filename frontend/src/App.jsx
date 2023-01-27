import {
    BrowserRouter,
    Routes,
    Route,
    useRoutes,
    useNavigate
} from "react-router-dom";

import {AuthProvider} from "./hooks/useAuth";
import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import NotFound from "./pages/notFound";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {useEffect} from "react";
import {useAuth} from "./hooks/useAuth";

export default function App() {
    // const {user} = useAuth();
    // const navigate = useNavigate();

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/u/:username"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
