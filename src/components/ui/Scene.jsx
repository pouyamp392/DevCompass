import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import StarField from "./galaxy/StarField";
import GalaxyNebula from "./galaxy/GalaxyNebula.jsx";
import CameraRig from "./galaxy/CameraRig.jsx";
import ShootingStar from "./galaxy/ShootingStar.jsx";

export default function Scene({ variant = "hero" }) {
    const isHero = variant === "hero";

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance"
                }}
                camera={{
                    position: [0, 0, 10],
                    fov: 60,
                    near: 0.1,
                    far: 500
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={["#04070d"]} />

                {isHero ? (
                    <>
                        {/* لایه دوردست - ستاره‌های ریز زیاد */}
                        <StarField
                            count={3000}
                            spread={350}
                            sizeMin={0.3}
                            sizeMax={0.8}
                            opacity={0.5}
                            colorPalette="cool"
                        />

                        {/* لایه میانی */}
                        <StarField
                            count={900}
                            spread={250}
                            sizeMin={0.6}
                            sizeMax={1.2}
                            opacity={0.6}
                            colorPalette="mixed"
                            twinkle={true}
                        />

                        {/* لایه نزدیک - چندتا ستاره کمی درخشان‌تر */}
                        <StarField
                            count={150}
                            spread={150}
                            sizeMin={1.2}
                            sizeMax={2}
                            opacity={0.8}
                            colorPalette="warm"
                            twinkle={true}
                        />

                        {/* ابر کهکشانی اول - بزرگ، سمت بالا-چپ */}
                        <GalaxyNebula
                            position={[-25, 15, -55]}
                            scale={[220, 220, 1]}
                            opacity={0.45}
                            color1="rgba(75,130,195,1)"
                            color2="rgba(35,70,120,1)"
                            rotationSpeed={0.0002}
                            seed={7}
                        />

                        {/* ابر دوم - پایین چپ، کم‌رنگ‌تر */}
                        <GalaxyNebula
                            position={[-10, -20, -60]}
                            scale={[180, 180, 1]}
                            opacity={0.3}
                            color1="rgba(55,100,160,1)"
                            color2="rgba(25,50,90,1)"
                            rotationSpeed={-0.00015}
                            seed={23}
                        />

                        {/* ابر سوم - خیلی محو، پس‌زمینه دور */}
                        <GalaxyNebula
                            position={[20, 5, -85]}
                            scale={[140, 140, 1]}
                            opacity={0.18}
                            color1="rgba(60,110,170,1)"
                            color2="rgba(30,60,100,1)"
                            rotationSpeed={0.0003}
                            seed={41}
                        />

                        <ShootingStar minDelay={3} maxDelay={8} />
                        <ShootingStar minDelay={5} maxDelay={12} />

                        <CameraRig />

                        <EffectComposer>
                            <Bloom
                                intensity={0.35}
                                luminanceThreshold={0.35}
                                luminanceSmoothing={0.6}
                                mipmapBlur
                            />
                        </EffectComposer>
                    </>
                ) : (
                    <>
                        <StarField count={6000} radius={220} distribution="natural" twinkle />
                        {/* <StarField count={6000} radius={220} distribution="sphere" twinkle /> */}
                        {/* <StarField count={6000} radius={220} distribution="sphere" twinkle /> */}
                        <GalaxyNebula
                            position={[0, 0, -40]}
                            scale={[110, 110, 1]}
                            opacity={0.2}
                            color1="rgba(70,120,190,1)"
                            color2="rgba(35,70,120,1)"
                        />
                    </>
                )}
            </Canvas>
        </div>
    );
}