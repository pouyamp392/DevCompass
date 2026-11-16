import * as THREE from "three";

import {
    randomStarColor,
    randomStarSize,
    randomTwinkleSpeed,
    randomPhase,
    randomDepthLayer,
    randomBrightness,
} from "./StarUtils";

import {
    createPosition,
} from "./StarDistribution";


export default function createStarGeometry({

    count = 3000,

    radius = 180,

    distribution = "sphere",

} = {}) {


    const positions =
        new Float32Array(
            count * 3
        );


    const colors =
        new Float32Array(
            count * 3
        );


    const sizes =
        new Float32Array(
            count
        );


    const speeds =
        new Float32Array(
            count
        );


    const phases =
        new Float32Array(
            count
        );


    const brightness =
        new Float32Array(
            count
        );



    for(
        let i = 0;
        i < count;
        i++
    ){


        /*
        -----------------------
        Position
        -----------------------
        */


        const position =
            createPosition(
                distribution,
                radius
            );


        positions[i * 3] =
            position.x;


        positions[i * 3 + 1] =
            position.y;


        positions[i * 3 + 2] =
            position.z;




        /*
        -----------------------
        Color
        -----------------------
        */


        const color =
            randomStarColor();


        colors[i * 3] =
            color.r;


        colors[i * 3 + 1] =
            color.g;


        colors[i * 3 + 2] =
            color.b;




        /*
        -----------------------
        Size
        -----------------------
        */


        sizes[i] =
            randomStarSize();




        /*
        -----------------------
        Twinkle
        -----------------------
        */


        speeds[i] =
            randomTwinkleSpeed();


        phases[i] =
            randomPhase();




        /*
        -----------------------
        Brightness
        -----------------------
        */


        brightness[i] =
            randomBrightness();



        /*
        Layer info
        فعلا ذخیره می‌کنیم
        برای نسخه بعد shader
        */

        randomDepthLayer();


    }




    const geometry =
        new THREE.BufferGeometry();



    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );


    geometry.setAttribute(

        "color",

        new THREE.BufferAttribute(
            colors,
            3
        )

    );


    geometry.setAttribute(

        "aSize",

        new THREE.BufferAttribute(
            sizes,
            1
        )

    );


    geometry.setAttribute(

        "aSpeed",

        new THREE.BufferAttribute(
            speeds,
            1
        )

    );


    geometry.setAttribute(

        "aPhase",

        new THREE.BufferAttribute(
            phases,
            1
        )

    );


    geometry.setAttribute(

        "aBrightness",

        new THREE.BufferAttribute(
            brightness,
            1
        )

    );



    return geometry;

}