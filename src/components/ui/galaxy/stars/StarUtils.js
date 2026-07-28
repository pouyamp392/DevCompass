import * as THREE from "three";
import { randomStarType } from "./StarPalette";

/**
 * عدد تصادفی بین min و max
 */
export function random(min, max) {
    return THREE.MathUtils.randFloat(
        min,
        max
    );
}

/**
 * عدد صحیح تصادفی
 */
export function randomInt(min, max) {
    return THREE.MathUtils.randInt(
        min,
        max
    );
}

/**
 * احتمال وقوع
 * chance(0.1) => ده درصد
 */
export function chance(value) {
    return Math.random() < value;
}

/**
 * توزیع نمایی
 * بیشتر خروجی‌ها نزدیک صفر هستند.
 */
export function exponential(power = 4) {
    return Math.pow(
        Math.random(),
        power
    );
}

/**
 * توزیع طبیعی‌تر برای اندازه ستاره
 */
export function randomStarSize() {
    const r = Math.random();

    // ۹۰٪ - کوچیک، ولی رنج بازتر از قبل
    if (r < 0.90) {
        return random(0.4, 1.1);
    }

    // ۸٪ - متوسط، واضح‌تر از قبل
    if (r < 0.98) {
        return random(1.4, 2.6);
    }

    // ۲٪ - ستاره‌های واقعا برجسته و درشت
    return random(3.2, 5.5);
}

/**
 * سرعت چشمک
 */
export function randomTwinkleSpeed() {
    return random(
        0.4,
        2.2
    );
}

/**
 * فاز چشمک
 */
export function randomPhase() {
    return random(
        0,
        Math.PI * 2
    );
}

/**
 * رنگ واقعی ستاره
 */
export function randomStarColor() {

    const star =
        randomStarType();

    const color =
        star.color.clone();

    const brightness =
        random(
            star.minBrightness,
            star.maxBrightness
        );

    color.multiplyScalar(
        brightness
    );

    return color;
}

/**
 * روشنایی
 */
export function randomBrightness() {
    const r = Math.random();

    if (r < 0.75)
        return random(1.0, 1.4); // اکثریت: قابل دیدن، نه محو

    if (r < 0.96)
        return random(1.4, 2.0);

    return random(2.0, 3.2); // نادر: واقعا درخشان
}
/**
 * موقعیت کروی
 */
export function randomSpherePosition(
    radius
) {

    const theta =
        Math.random() *
        Math.PI *
        2;

    const phi =
        Math.acos(
            THREE.MathUtils.randFloatSpread(
                2
            )
        );

    return new THREE.Vector3(

        radius *
            Math.sin(phi) *
            Math.cos(theta),

        radius *
            Math.cos(phi),

        radius *
            Math.sin(phi) *
            Math.sin(theta)

    );
}

/**
 * لرزش جزئی
 */
export function jitter(
    vector,
    amount
) {

    vector.x += random(
        -amount,
        amount
    );

    vector.y += random(
        -amount,
        amount
    );

    vector.z += random(
        -amount,
        amount
    );

    return vector;

}

/**
 * لایه عمق
 */
export function randomDepthLayer() {

    const r =
        Math.random();

    if (r < 0.6)
        return "far";

    if (r < 0.9)
        return "mid";

    return "near";

}