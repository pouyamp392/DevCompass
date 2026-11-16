// galaxy/CameraRig.jsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraRig() {
    const mouse = useRef({ x: 0, y: 0 });
    const smooth = useRef({ x: 0, y: 0 });

    if (typeof window !== "undefined") {
        window.onmousemove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
    }

    useFrame(({ camera, clock }) => {
        const t = clock.getElapsedTime();

        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.01;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.01;

        const drift = Math.sin(t * 0.02) * 0.25;

        camera.position.x = smooth.current.x * 0.25 + drift;
        camera.position.y = smooth.current.y * 0.15;

        camera.lookAt(0, 0, 0);
    });

    return null;
}