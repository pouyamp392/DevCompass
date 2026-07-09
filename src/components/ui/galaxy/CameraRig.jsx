import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig() {


const mouse = useRef({
    x: 0,
    y: 0
});

window.onmousemove = (e) => {

    mouse.current.x =
        (e.clientX / window.innerWidth) * 2 - 1;

    mouse.current.y =
        -(e.clientY / window.innerHeight) * 2 + 1;
};

useFrame(({ camera, clock }) => {

    const t = clock.getElapsedTime();

    camera.position.x = THREE.MathUtils.lerp(

        camera.position.x,

        mouse.current.x * 2,

        0.02

    );

    camera.position.y = THREE.MathUtils.lerp(

        camera.position.y,

        mouse.current.y * 1.2,

        0.02

    );

    camera.position.z =
        10 +
        Math.sin(t * 0.15) * 0.5;

    camera.lookAt(0,0,0);

});

return null;


}
