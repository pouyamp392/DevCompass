import * as THREE from "three";
import { useMemo } from "react";

import vertexShader from "./shaders/core.vert?raw";
import fragmentShader from "./shaders/core.frag?raw";

export default function GalaxyCore() {

    const material = useMemo(() => {

        return new THREE.ShaderMaterial({

            vertexShader,
            fragmentShader,

            transparent: true,

            depthWrite: false,

            blending: THREE.NormalBlending

        });

    }, []);

    return (

        <mesh>

            <planeGeometry args={[6, 6]} />

            <primitive object={material} attach="material" />

        </mesh>

    );

}