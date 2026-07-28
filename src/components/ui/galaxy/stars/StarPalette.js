import * as THREE from "three";
export const STAR_TYPES = [
    { name: "O", weight: 0.002, color: new THREE.Color("#9bbcff"), minBrightness: 0.9, maxBrightness: 1.15 },
    { name: "B", weight: 0.01,  color: new THREE.Color("#b9d0ff"), minBrightness: 0.85, maxBrightness: 1.1 },
    { name: "A", weight: 0.05,  color: new THREE.Color("#edf3ff"), minBrightness: 0.8, maxBrightness: 1.05 },
    { name: "F", weight: 0.12,  color: new THREE.Color("#fff8f2"), minBrightness: 0.75, maxBrightness: 1.0 },
    { name: "G", weight: 0.25,  color: new THREE.Color("#fff2c6"), minBrightness: 0.65, maxBrightness: 0.95 },
    { name: "K", weight: 0.28,  color: new THREE.Color("#ffd7a8"), minBrightness: 0.55, maxBrightness: 0.85 },
    { name: "M", weight: 0.288, color: new THREE.Color("#ffb56b"), minBrightness: 0.45, maxBrightness: 0.75 },
];
export function randomStarType() {

    const r = Math.random();

    let total = 0;

    for (const star of STAR_TYPES) {

        total += star.weight;

        if (r <= total) {

            return star;

        }

    }

    return STAR_TYPES.at(-1);

}