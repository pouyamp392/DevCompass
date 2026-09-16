import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Roadmap from "./pages/Roadmap";
import Skill from "./pages/Skill";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Skills from "./pages/Skills";
import Register from "./pages/Register";
import Login from "./pages/login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/quiz" element={<Quiz />} />

            <Route path="/result" element={<Result />} />

            <Route element={<ProtectedRoute />}>


                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/roadmap" element={<Roadmap />} />

                    <Route path="/skill/:id" element={<Skill />} />

                    <Route path="/skills" element={<Skills />} />

                    <Route path="/profile" element={<Profile />} />

                </Route>
            </Route>
        </Routes>
    );
}