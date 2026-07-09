import { useMemo } from "react";
import * as THREE from "three";

export default function GalaxyNebula() {

    const texture = useMemo(() => {

        const canvas = document.createElement("canvas");

        canvas.width = 512;
        canvas.height = 512;

        const ctx = canvas.getContext("2d");

        const gradient = ctx.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            256
        );

        gradient.addColorStop(0, "rgba(80,120,255,0.4)");
        gradient.addColorStop(0.4, "rgba(120,80,255,0.2)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        return new THREE.CanvasTexture(canvas);

    }, []);

    return (
        <sprite
            scale={[120, 120, 1]}
            position={[0, 0, -40]}
        >
            <spriteMaterial
                map={texture}
                transparent
                opacity={0.55}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </sprite>
    );
}