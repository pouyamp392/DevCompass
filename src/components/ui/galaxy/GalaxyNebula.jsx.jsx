import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeNoise2D(seed = 1) {
    let s = seed % 233280;
    const rand = () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
    const p = [...Array(256)].map((_, i) => i);
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
    }
    const perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + t * (b - a);
    const grad = (hash, x, y) => {
        const h = hash & 3;
        const u = h < 2 ? x : y;
        const v = h < 2 ? y : x;
        return (h & 1 ? -u : u) + (h & 2 ? -v : v);
    };

    return (x, y) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = fade(x);
        const v = fade(y);
        const aa = perm[X + perm[Y]];
        const ab = perm[X + perm[Y + 1]];
        const ba = perm[X + 1 + perm[Y]];
        const bb = perm[X + 1 + perm[Y + 1]];
        return lerp(
            lerp(grad(aa, x, y), grad(ba, x - 1, y), u),
            lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u),
            v
        );
    };
}

function fbm(noise, x, y, octaves = 6, lacunarity = 2.0, gain = 0.5) {
    let value = 0;
    let amplitude = 0.5;
    let freq = 1;
    for (let i = 0; i < octaves; i++) {
        value += amplitude * noise(x * freq, y * freq);
        freq *= lacunarity;
        amplitude *= gain;
    }
    return value;
}

// نویزِ ridged: قدرمطلقِ fbm، خطوطِ باریک و رشته‌ای می‌سازه (شبیه رگه‌های دود)
function ridgedFbm(noise, x, y, octaves = 6) {
    let value = 0;
    let amplitude = 0.5;
    let freq = 1;
    for (let i = 0; i < octaves; i++) {
        const n = 1 - Math.abs(noise(x * freq, y * freq));
        value += amplitude * n * n; // مربع کردن برای رشته‌های باریک‌تر و تیزتر
        freq *= 2.1;
        amplitude *= 0.5;
    }
    return value;
}

function parseRgba(str, fallback) {
    const m = str && str.match(/[\d.]+/g);
    if (!m || m.length < 3) return fallback;
    return [Number(m[0]), Number(m[1]), Number(m[2])];
}

export default function GalaxyNebula({
    position = [0, 0, -60],
    scale = [160, 160, 1],
    opacity = 0.4,
    color1 = "rgba(70,120,190,1)",
    color2 = "rgba(40,80,140,1)",
    rotationSpeed = 0.0003,
    seed,
}) {
    const spriteRef = useRef();
    const seedRef = useRef(
        seed ?? Math.floor(position[0] * 13 + position[1] * 7 + position[2] * 3 + 1000)
    );

    useFrame(() => {
        if (spriteRef.current) {
            spriteRef.current.material.rotation += rotationSpeed;
        }
    });

    const texture = useMemo(() => {
        const size = 1024;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const imgData = ctx.createImageData(size, size);

        const noise = makeNoise2D(seedRef.current);
        const warpNoise = makeNoise2D(seedRef.current + 999);
        const [r1, g1, b1] = parseRgba(color1, [70, 120, 190]);
        const [r2, g2, b2] = parseRgba(color2, [40, 80, 140]);

        const scaleFactor = 2.6;
        const warpStrength = 0.9; // شدت پیچش دامنه؛ هرچی بیشتر، رشته‌ها منحنی‌تر و آشفته‌تر

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const nx = (x / size) * scaleFactor;
                const ny = (y / size) * scaleFactor;

                // --- Domain Warping ---
                // مختصات نمونه‌برداری رو قبل از محاسبه‌ی چگالی اصلی، با یه لایه نویز
                // جداگانه جابه‌جا می‌کنیم. این کار خطوط صاف/بلوبی رو به رشته‌های
                // پیچ‌خورده و آشفته‌ی طبیعی تبدیل می‌کنه (تکنیک استاندارد رندر ابر/دود).
                const warpX = fbm(warpNoise, nx + 5.2, ny + 1.3, 4);
                const warpY = fbm(warpNoise, nx + 8.7, ny + 3.1, 4);

                const wx = nx + warpX * warpStrength;
                const wy = ny + warpY * warpStrength;

                const base = (fbm(noise, wx, wy, 6) + 1) / 2;
                const ridged = ridgedFbm(noise, wx * 1.8 + 40, wy * 1.8 + 40, 5);

                let density = base * 0.35 + ridged * 0.65;

                // وینیت نرم لبه‌ها
                const dx = x / size - 0.5;
                const dy = y / size - 0.5;
                const edge = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.7);
                density *= Math.max(0, edge);

                // آستانه‌گذاری نرم: بیشتر بوم خالی می‌مونه، فقط رشته‌های پرتراکم دیده می‌شن
                density = Math.pow(Math.max(0, density - 0.3), 1.8) * 2.6;
                density = Math.min(1, density);

                const mixT = base;
                const r = r1 * (1 - mixT) + r2 * mixT;
                const g = g1 * (1 - mixT) + g2 * mixT;
                const b = b1 * (1 - mixT) + b2 * mixT;

                const idx = (y * size + x) * 4;
                imgData.data[idx] = r;
                imgData.data[idx + 1] = g;
                imgData.data[idx + 2] = b;
                imgData.data[idx + 3] = Math.floor(density * 255 * opacity);
            }
        }

        ctx.putImageData(imgData, 0, 0);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, [color1, color2, opacity]);

    return (
        <sprite ref={spriteRef} position={position} scale={scale}>
            <spriteMaterial
                map={texture}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </sprite>
    );
}