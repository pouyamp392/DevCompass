import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

import vertex from "./shaders/meteor.vert?raw";
import fragment from "./shaders/meteor.frag?raw";

const MeteorTrailMaterial =
    shaderMaterial(
        {
            uOpacity: 1
        },
        vertex,
        fragment
    );

export default MeteorTrailMaterial;