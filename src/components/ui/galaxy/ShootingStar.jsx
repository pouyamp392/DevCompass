import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import MeteorTrailMaterial from "./MeteorTrail";

extend({
    MeteorTrailMaterial,
});

export default function ShootingStar({
    minDelay = 5,
    maxDelay = 12,

    firstDelay = [1, 3],
}) {
    const groupRef = useRef();

    const trailRef = useRef();
    const materialRef = useRef();

    const headRef = useRef();
    const lightRef = useRef();

    const state = useRef({
        phase: "idle",

        timer: THREE.MathUtils.randFloat(
            firstDelay[0],
            firstDelay[1]
        ),

        dir: new THREE.Vector2(),

        speed: 100,

        length: 18,
    });

    function scheduleNext() {
        const s = state.current;

        s.phase = "idle";

        s.timer =
            THREE.MathUtils.randFloat(
                minDelay,
                maxDelay
            );
    }

    function startFlight() {
        const s = state.current;
        const g = groupRef.current;

        if (!g) return;

        // شروع از بیرون صفحه
        g.position.set(
            -60,
            THREE.MathUtils.randFloat(
                18,
                35
            ),
            THREE.MathUtils.randFloat(
                -35,
                -15
            )
        );

        const angle =
            THREE.MathUtils.randFloat(
                -0.45,
                -0.2
            );

        s.dir.set(
            Math.cos(angle),
            Math.sin(angle)
        );

        s.speed =
            THREE.MathUtils.randFloat(
                90,
                140
            );

        s.length =
            THREE.MathUtils.randFloat(
                16,
                28
            );

        s.phase = "flying";

        g.rotation.z = angle;

        if (trailRef.current) {
            trailRef.current.scale.set(
                s.length,
                0.08,
                1
            );

            trailRef.current.position.set(
                -s.length * 0.5,
                0,
                0
            );
        }
    }

    useFrame((_, delta) => {
        const s = state.current;
        const g = groupRef.current;

        if (!g) return;

        if (s.phase === "idle") {
            s.timer -= delta;

            if (materialRef.current)
                materialRef.current.uOpacity = 0;

            if (headRef.current)
                headRef.current.material.opacity = 0;

            if (lightRef.current)
                lightRef.current.intensity = 0;

            if (s.timer <= 0)
                startFlight();

            return;
        }

        // خروج از صفحه
        if (
            g.position.x > 65 ||
            g.position.y < -40
        ) {
            scheduleNext();
            return;
        }

        s.speed += delta * 8;

        const wobble =
            Math.sin(
                performance.now() * 0.01
            ) * 0.01;

        g.position.x +=
            (s.dir.x + wobble) *
            s.speed *
            delta;

        g.position.y +=
            s.dir.y *
            s.speed *
            delta;

        const opacity = 0.9;

        if (materialRef.current) {
            materialRef.current.uOpacity =
                opacity;

            // motion blur fake
            trailRef.current.scale.x =
                s.length *
                (1 + s.speed / 300);
        }

        if (headRef.current) {
            headRef.current.material.opacity =
                opacity;

            headRef.current.scale.setScalar(
                0.8 +
                    Math.sin(
                        performance.now() *
                            0.02
                    ) *
                        0.05
            );
        }

        if (lightRef.current) {
            lightRef.current.intensity =
                opacity * 4;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Trail */}

            <mesh ref={trailRef}>
                <planeGeometry
                    args={[1, 1]}
                />

                <meteorTrailMaterial
                    ref={materialRef}
                    transparent
                    depthWrite={false}
                    blending={
                        THREE.AdditiveBlending
                    }
                />
            </mesh>

            {/* Head */}

            <mesh ref={headRef}>
                <sphereGeometry
                    args={[
                        0.07,
                        16,
                        16,
                    ]}
                />

                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0}
                />
            </mesh>

            {/* Glow */}

            <pointLight
                ref={lightRef}
                color="#dbefff"
                intensity={0}
                distance={10}
                decay={2}
            />
        </group>
    );
}