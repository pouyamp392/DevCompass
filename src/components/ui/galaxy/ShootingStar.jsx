import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShootingStar() {


const star = useRef();

const speed =
    useRef(
        THREE.MathUtils.randFloat(
            20,
            35
        )
    );

const reset = () => {

    star.current.position.set(

        THREE.MathUtils.randFloat(
            -150,
            150
        ),

        THREE.MathUtils.randFloat(
            50,
            120
        ),

        THREE.MathUtils.randFloat(
            -100,
            -20
        )

    );

};

useFrame((_, delta) => {

    if (!star.current) return;

    star.current.position.x +=
        speed.current * delta;

    star.current.position.y -=
        speed.current * delta * 0.35;

    if (

        star.current.position.x > 180 ||

        star.current.position.y < -120

    ) {

        reset();
    }
});

return (

    <mesh
        ref={star}
        position={[-100,80,-40]}
    >

        <sphereGeometry args={[0.15,8,8]} />

        <meshBasicMaterial
            color="#ffffff"
        />

    </mesh>

);


}
