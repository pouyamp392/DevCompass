import * as THREE from "three";

import vertexShader from "../shaders/star.vert?raw";
import fragmentShader from "../shaders/star.frag?raw";


export default function createStarMaterial({
    opacity = 1,
    twinkle = true,
} = {}) {


    const material =
        new THREE.ShaderMaterial({

            vertexShader,

            fragmentShader,


            transparent: true,


            depthWrite: false,


            vertexColors: true,


            blending:
                THREE.AdditiveBlending,


            uniforms: {

                uTime: {
                    value: 0,
                },


                uTwinkle: {
                    value: twinkle,
                },


                uOpacity: {
                    value: opacity,
                },

            },


        });



    return material;

}