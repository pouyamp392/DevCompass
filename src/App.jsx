import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Roadmap from "./pages/Roadmap";

export default function App() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/quiz" element={<Quiz />} />

            <Route path="/result" element={<Result />} />

            <Route path="/roadmap" element={<Roadmap />} />

        </Routes>
    );
}