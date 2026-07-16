import { Link } from "react-router-dom";

import Hero from "../components/ui/Hero";
import generateRoadmap from "../engine/generateRoadmap";

console.log(generateRoadmap("frontend"));


export default function Home() {
    return (
        <Hero />
    );
}