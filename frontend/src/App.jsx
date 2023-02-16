import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import LoginPage from "./login";
import ProfilePage from "./pages/Profile";
import AllBoarditsPage from "./pages/AllBoardits";
import MyBoarditsPage from "./pages/MyBoardits";
import BoarditPage from "./pages/BoarditPages/Home";
import BoarditUsers from "./pages/BoarditPages/Users";
import SavedPosts from "./pages/SavedPosts";
import JoinRequestsPage from "./pages/BoarditPages/JoinReq";

import {ProtectedRoute, ROOT} from "./components/ProtectedRoute";
import NotFound from "./pages/notFound";

function redirect(paths, redirectPath) {
    return paths.map(path => (
        <Route path={path} element={<Navigate to={redirectPath} />} />
    ));
}

export default function App() {
    const loggedIn = JSON.parse(window.localStorage.getItem("LOGGED_IN"));

    return (
        <BrowserRouter basename={ROOT}>
            <Routes>
                <Route
                    path="/"
                    element={!loggedIn ? <LoginPage /> : <Navigate to="/all" />}
                />

                {redirect(["/u", "/r", "/4reddit"], "/all")}

                <Route element={<ProtectedRoute />}>
                    <Route path="/all" element={<AllBoarditsPage />} />
                    <Route path="/my" element={<MyBoarditsPage />} />
                    <Route path="/saved" element={<SavedPosts />} />

                    <Route path="/u/:username" element={<ProfilePage />} />
                    <Route path="/r/:boarditName" element={<BoarditPage />} />

                    <Route
                        path="/r/:boarditName/users"
                        element={<BoarditUsers />}
                    />
                    <Route
                        path="/r/:boarditName/joinreq"
                        element={<JoinRequestsPage />}
                    />
                </Route>
                <Route path="*" element={<NotFound message={404} />} />
            </Routes>
        </BrowserRouter>
    );
}
