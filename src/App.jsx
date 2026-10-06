import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Roadmap from "./pages/Roadmap";
import Skill from "./pages/Skill";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import MainLayout from "./layouts/MainLayout";
import Skills from "./pages/Skills";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <Routes>

            {/* صفحات عمومی — کاربر لاگین‌شده → dashboard */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
            </Route>

            {/* صفحات محافظت‌شده — کاربر لاگین‌نشده → login */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/skill/:id" element={<Skill />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/achievements" element={<Achievements />} />
                </Route>
            </Route>

        </Routes>
    );
}