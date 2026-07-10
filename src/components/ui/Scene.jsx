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
export default function Scene({

    variant = "hero"

}) {

    const isHero = variant === "hero";

    return (

        <div className="fixed inset-0 -z-10">

            <Canvas
                gl={{ antialias: true }}
                camera={{
                    position: [0, 0, 10],
                    fov: 75,
                    near: 0.1,
                    far: 500
                }}
            >

                <color
                    attach="background"
                    args={["#00040c"]}
                />

                <ambientLight intensity={1} />

                {/* Dust */}
                <StarField
                    count={isHero ? 7000 : 2500}
                    spread={isHero ? 450 : 300}
                    sizeMin={0.02}
                    sizeMax={0.08}
                    opacity={0.05}
                />

                {/* Far */}
                <StarField
                    count={isHero ? 5000 : 1800}
                    spread={isHero ? 300 : 220}
                    sizeMin={0.08}
                    sizeMax={0.18}
                    opacity={0.25}
                />

                {/* Mid */}
                <StarField
                    count={isHero ? 2000 : 800}
                    spread={isHero ? 180 : 150}
                    sizeMin={0.18}
                    sizeMax={0.45}
                    opacity={0.55}
                />

                {/* Near */}
                <StarField
                    count={isHero ? 500 : 200}
                    spread={isHero ? 90 : 80}
                    sizeMin={0.6}
                    sizeMax={1.3}
                    opacity={1}
                />

                {
                    isHero && (
                        <>
                            <GalaxyNebula
                                position={[40, 15, -60]}
                                scale={[220, 220, 1]}
                            />

                            <GalaxyNebula
                                position={[-50, -25, -70]}
                                scale={[260, 260, 1]}
                            />
                        </>
                    )
                }

                {
                    isHero && (
                        <>
                            <CameraRig />

                            <ShootingStar />
                            <ShootingStar />
                            <ShootingStar />
                            <ShootingStar />
                        </>
                    )
                }

                {
                    isHero && (
                        <EffectComposer>
                            <Bloom
                                intensity={1.1}
                                luminanceThreshold={0.2}
                                luminanceSmoothing={0.9}
                                mipmapBlur
                            />
                        </EffectComposer>
                    )
                }

            </Canvas>

        </div>

    );
}