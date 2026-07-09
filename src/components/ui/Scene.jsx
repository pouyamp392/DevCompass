import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import StarField from "./Galaxy/StarField";
import GalaxyCore from "./galaxy/GalaxyCore";
import Nebula from "./galaxy/GalaxyNebula.jsx";
import GalaxyNebula from "./galaxy/GalaxyNebula.jsx";
import CameraRig from "./galaxy/CameraRig.jsx";
import ShootingStar from "./galaxy/ShootingStar.jsx";

export default function Scene() {

    return (

        <div className="fixed inset-0 -z-10">

            <Canvas

                gl={{
                    antialias: true
                }}
                camera={{
                    position: [0, 0, 10],
                    fov: 75,
                    near: 0.1,
                    far: 500
                }}

            >
                <color attach="background" args={["#00040c"]} />

                <ambientLight intensity={1} />
                {/* Dust */}

                <StarField
                    count={7000}
                    spread={450}
                    sizeMin={0.02}
                    sizeMax={0.08}
                    opacity={0.05}
                />

                {/* Far Stars */}

                <StarField
                    count={5000}
                    spread={300}
                    sizeMin={0.08}
                    sizeMax={0.18}
                    opacity={0.25}
                />

                {/* Mid Stars */}

                <StarField
                    count={2000}
                    spread={180}
                    sizeMin={0.18}
                    sizeMax={0.45}
                    opacity={0.55}
                />

                {/* Near Stars */}

                <StarField
                    count={500}
                    spread={90}
                    sizeMin={0.6}
                    sizeMax={1.3}
                    opacity={1}
                />
                <EffectComposer>

                    <Bloom
                        intensity={1.1}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />

                </EffectComposer>
                {/* <GalaxyCore
                    position={[-2, 0, -8]}
                    scale={1}
                /> */}

                <GalaxyNebula
                    position={[40, 15, -60]}
                    scale={[220, 220, 1]}
                />

                <GalaxyNebula
                    position={[-50, -25, -70]}
                    scale={[260, 260, 1]}
                />

                <CameraRig />
                <ShootingStar />
                <ShootingStar />
                <ShootingStar />
                <ShootingStar />


            </Canvas>

        </div>

    );

}