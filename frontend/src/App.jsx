import React, {useState, useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useParams
} from "react-router-dom";

import LoginPage from "./login";
import ProfilePage from "./pages/Profile";
import AllBoarditsPage from "./pages/AllBoardits";
import MyBoarditsPage from "./pages/MyBoardits";
import BoarditPage from "./pages/BoarditPages/Home";
import BoarditUsers from "./pages/BoarditPages/Users";
import SavedPosts from "./pages/SavedPosts";
import JoinRequestsPage from "./pages/BoarditPages/JoinReq";
import ReportsPage from "./pages/BoarditPages/Reports";
import StatsPage from "./pages/BoarditPages/Stats";

import {postTo, parseQuery} from "./helpers";
import {ProtectedRoute, ROOT} from "./components/ProtectedRoute";
import NotFound from "./pages/notFound";
import Loading from "./components/Loading";

function redirect(paths, redirectPath) {
    return paths.map(path => (
        <Route path={path} element={<Navigate to={redirectPath} />} />
    ));
}

export default function App() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem("token");

            if (token) {
                let res = await postTo("/login/auth", {token});
                res = await res.json();

                if (res.success) {
                    setLoggedIn(true);
                    setLoading(false);
                    return;
                } else {
                    setLoggedIn(false);
                }
            }

            const params = parseQuery(window.location.search);

            if (
                "token" in params &&
                "username" in params &&
                "email" in params
            ) {
                let res = await postTo("/login/auth", {
                    token: params.token
                });
                res = await res.json();

                if (res.success) {
                    let verify = await postTo("/login/cas/verify", {
                        token: params.token,
                        username: params.username,
                        email: params.email
                    });
                    verify = await verify.json();

                    if (verify.success) {
                        window.localStorage.setItem(
                            "username",
                            verify.username.username
                        );
                        window.localStorage.setItem("token", params.token);
                        setLoggedIn(true);
                    } else {
                        setLoggedIn(false);
                    }
                } else {
                    setLoggedIn(false);
                }
            } else {
                setLoggedIn(false);
            }

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <BrowserRouter basename={ROOT}>
            <Routes>
                <Route
                    path="/"
                    element={!loggedIn ? <LoginPage /> : <Navigate to="/all" />}
                />
                <Route path="4reddit/api/login/cas" />

                {redirect(["/u", "/r", "/4reddit"], "/all")}

                {loggedIn ? (
                    <React.Fragment>
                        <Route path="/all" element={<AllBoarditsPage />} />
                        <Route path="/my" element={<MyBoarditsPage />} />
                        <Route path="/saved" element={<SavedPosts />} />
                        <Route path="/u/:username" element={<ProfilePage />} />
                        <Route
                            path="/r/:boarditName"
                            element={<BoarditPage />}
                        />
                        <Route
                            path="/r/:boarditName/users"
                            element={<BoarditUsers />}
                        />
                        <Route
                            path="/r/:boarditName/joinreq"
                            element={<JoinRequestsPage />}
                        />
                        <Route
                            path="/r/:boarditName/reports"
                            element={<ReportsPage />}
                        />
                        <Route
                            path="/r/:boarditName/stats"
                            element={<StatsPage />}
                        />
                        <Route path="*" element={<NotFound message={404} />} />
                    </React.Fragment>
                ) : (
                    <Route path="*" element={<Navigate to={ROOT} />}></Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}
