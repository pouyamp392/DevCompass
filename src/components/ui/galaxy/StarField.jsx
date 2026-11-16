import {
    useMemo,
    useRef,
    useEffect,
} from "react";

import {
    useFrame,
} from "@react-three/fiber";

import createStarGeometry from "./stars/StarGeometry";
import createStarMaterial from "./stars/StarMaterial";


export default function StarField({

    count = 4000,
    radius = 180,
    distribution = "sphere",
    opacity = 1,
    twinkle = true,

}) {


    const materialRef = useRef();



    const geometry = useMemo(
        () =>
            createStarGeometry({

                count,
                radius,
                distribution,

            }),

        [
            count,
            radius,
            distribution,
        ]
    );



    const material = useMemo(
        () => {

            const mat =
                createStarMaterial({

                    opacity,
                    twinkle,

                });


            materialRef.current = mat;


            return mat;

        },

        [
            opacity,
            twinkle,
        ]
    );



    useFrame(
        (_, delta) => {

            if(materialRef.current){

                materialRef.current
                .uniforms
                .uTime
                .value += delta;

            }

        }
    );



    useEffect(() => {


        return () => {

            geometry.dispose();

            material.dispose();

        };


    }, [
        geometry,
        material,
    ]);



    return (

        <points

            geometry={geometry}

            material={material}

        />

    );

}