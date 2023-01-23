import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import NotFound from "./pages/notFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/u/:username" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
