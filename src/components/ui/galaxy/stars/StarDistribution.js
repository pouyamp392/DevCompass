import * as THREE from "three";
import { random } from "./StarUtils";

/*
|--------------------------------------------------------------------------
| Spherical density field (برای پخش نامنظم/طبیعی، نه یکنواخت کامل)
|--------------------------------------------------------------------------
| به‌جای یک نویز Perlin سه‌بعدی کامل، از جمع چند "موج" روی چند جهت ثابت
| رندوم استفاده می‌کنیم. نتیجه: میدان چگالی نرم و کم‌فرکانس روی سطح کره
| که چندتا ناحیه‌ی پرتراکم‌تر و چندتا خلوت‌تر می‌سازه - دقیقا حس واقعی
| آسمون شب که نقاطش کاملا یکنواخت رندوم نیستن.
*/

const DENSITY_DIRS = [...Array(5)].map(() => {
    const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).normalize();
    return {
        dir: v,
        freq: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
    };
});

function densityAt(dirVector) {
    let sum = 0;
    for (const d of DENSITY_DIRS) {
        sum += Math.cos(dirVector.dot(d.dir) * d.freq * Math.PI + d.phase);
    }
    // نرمال‌سازی به بازه‌ی 0..1
    return (sum / DENSITY_DIRS.length + 1) / 2;
}

// حداقل احتمال پذیرش، تا هیچ ناحیه‌ای کاملا خالی نشه (فقط کم‌تراکم‌تر)
const DENSITY_FLOOR = 0.35;

/*
|--------------------------------------------------------------------------
| Sphere Distribution
|--------------------------------------------------------------------------
*/

export function spherePosition(radius) {

    const theta = Math.random() * Math.PI * 2;

    const phi = Math.acos(
        2 * Math.random() - 1
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
 * مثل spherePosition، ولی با rejection sampling روی میدان چگالی:
 * جهت‌های نزدیک به "خوشه‌ها" شانس بیشتری برای انتخاب شدن دارن.
 * برای گرفتن N ستاره‌ی نهایی، این تابع رو تو یه حلقه‌ی retry صدا بزن
 * (نمونه در StarGeometry.js).
 */
export function naturalSpherePosition(radius) {
    const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).normalize();

    const density = densityAt(dir);
    const acceptProb = DENSITY_FLOOR + (1 - DENSITY_FLOOR) * density;

    if (Math.random() > acceptProb) {
        return null; // رد شد، دوباره تلاش کن
    }

    return dir.multiplyScalar(radius);
}

/*
|--------------------------------------------------------------------------
| Galaxy Distribution
|--------------------------------------------------------------------------
*/

export function galaxyPosition(radius) {

    const armCount = 4;

    const arm =
        Math.floor(
            Math.random() *
            armCount
        );

    const distance =
        Math.pow(
            Math.random(),
            1.8
        ) * radius;

    const angle =
        distance * 0.12 +
        (arm / armCount) *
        Math.PI * 2;

    const offset =
        random(
            -0.25,
            0.25
        );

    return new THREE.Vector3(

        Math.cos(
            angle + offset
        ) * distance,

        random(
            -6,
            6
        ),

        Math.sin(
            angle + offset
        ) * distance

    );

}

/*
|--------------------------------------------------------------------------
| Milky Way Band
|--------------------------------------------------------------------------
*/

export function milkyWayPosition(radius) {

    const x =
        random(
            -radius,
            radius
        );

    const y =
        random(
            -8,
            8
        );

    const z =
        random(
            -25,
            25
        );

    return new THREE.Vector3(
        x,
        y,
        z
    );

}

/*
|--------------------------------------------------------------------------
| Cluster Distribution
|--------------------------------------------------------------------------
*/

const clusters = [

    new THREE.Vector3(
        -40,
        12,
        -20
    ),

    new THREE.Vector3(
        35,
        -8,
        10
    ),

    new THREE.Vector3(
        -15,
        20,
        30
    ),

    new THREE.Vector3(
        25,
        5,
        -35
    )

];

export function clusterPosition() {

    const center =
        clusters[
            Math.floor(
                Math.random() *
                clusters.length
            )
        ];

    return new THREE.Vector3(

        center.x +
            random(
                -8,
                8
            ),

        center.y +
            random(
                -8,
                8
            ),

        center.z +
            random(
                -8,
                8
            )

    );

}

/*
|--------------------------------------------------------------------------
| Dust
|--------------------------------------------------------------------------
*/

export function dustPosition(radius) {

    return new THREE.Vector3(

        random(
            -radius,
            radius
        ),

        random(
            -radius * 0.3,
            radius * 0.3
        ),

        random(
            -radius,
            radius
        )

    );

}

/*
|--------------------------------------------------------------------------
| Dispatcher
|--------------------------------------------------------------------------
*/

export function createPosition(
    distribution,
    radius
) {

    switch(distribution){

        case "galaxy":
            return galaxyPosition(radius);

        case "milkyway":
            return milkyWayPosition(radius);

        case "cluster":
            return clusterPosition();

        case "dust":
            return dustPosition(radius);

        case "natural": {
            // چون rejection sampling ممکنه null برگردونه، تا موفقیت تلاش می‌کنیم
            let pos = null;
            let attempts = 0;
            while (pos === null && attempts < 20) {
                pos = naturalSpherePosition(radius);
                attempts++;
            }
            return pos || spherePosition(radius);
        }

        default:
            return spherePosition(radius);

    }

}