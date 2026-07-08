import "./galaxy.css";

import Stars from "./Stars";
import Nebula from "./Nebula";
import Meteors from "./Meteors";

export default function GalaxyBackground() {

    return (

        <section className="fixed inset-0 -z-50 overflow-hidden bg-[#020617]">

            <Nebula />

            <Stars />

            <Meteors />

        </section>

    );

}