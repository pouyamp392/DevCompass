import { useId } from "react";

// ---------------------------------------------------------------
// مسیرهای برنامه‌نویسی با هویت بصری مجزا
// ---------------------------------------------------------------
const PROGRAMMING_PATHS = [
  { label: "Frontend", shortLabel: "FE", angle: -Math.PI / 2 + 0.25, color: "#67e8f9", size: 5.2, importance: 0.86 },
  { label: "Backend", shortLabel: "BE", angle: -Math.PI / 2 + 1.03, color: "#60a5fa", size: 5.1, importance: 0.84 },
  { label: "AI", shortLabel: "AI", angle: -Math.PI / 2 + 1.82, color: "#a78bfa", size: 6.8, importance: 1 },
  { label: "GameDev", shortLabel: "GAME", angle: -Math.PI / 2 + 2.6, color: "#818cf8", size: 4.6, importance: 0.68 },
  { label: "DevOps", shortLabel: "OPS", angle: -Math.PI / 2 - 2.4, color: "#38bdf8", size: 4.8, importance: 0.72 },
  { label: "Cloud", shortLabel: "CLD", angle: -Math.PI / 2 - 1.62, color: "#7dd3fc", size: 4.7, importance: 0.7 },
  { label: "Mobile", shortLabel: "MOB", angle: -Math.PI / 2 - 0.84, color: "#60a5fa", size: 4.6, importance: 0.68 },
  { label: "Data", shortLabel: "DATA", angle: -Math.PI / 2 - 0.06, color: "#818cf8", size: 4.9, importance: 0.76 },
];

const DEGREE_MARKS = Array.from({ length: 36 });

const DIRECTIONS = [
  { label: "N", angle: -Math.PI / 2, color: "#e0f2fe" },
  { label: "E", angle: 0, color: "#67e8f9" },
  { label: "S", angle: Math.PI / 2, color: "#60a5fa" },
  { label: "W", angle: Math.PI, color: "#67e8f9" },
];

export default function DevCompassPremium() {
  const id = useId().replace(/:/g, "");

  const ids = {
    background: `dev-compass-background-${id}`,
    glass: `dev-compass-glass-${id}`,
    northNeedle: `dev-compass-north-needle-${id}`,
    southNeedle: `dev-compass-south-needle-${id}`,
    centerCore: `dev-compass-center-core-${id}`,
    radar: `dev-compass-radar-${id}`,
    glow: `dev-compass-glow-${id}`,
  };

  const classes = {
    root: `dev-compass-${id}`,
    needle: `dev-compass-needle-${id}`,
    radar: `dev-compass-radar-${id}`,
    centerPulse: `dev-compass-center-pulse-${id}`,
    activePath: `dev-compass-active-path-${id}`,
    ring: `dev-compass-ring-${id}`,
  };

  const animations = {
    idle: `dev-compass-idle-${id}`,
    scan: `dev-compass-scan-${id}`,
    radar: `dev-compass-radar-spin-${id}`,
    pulse: `dev-compass-pulse-${id}`,
    pathPulse: `dev-compass-path-pulse-${id}`,
  };

  return (
    <>
      <style>{`
        @keyframes ${animations.idle} {
          0%, 100% { transform: rotate(39.7deg); }
          50% { transform: rotate(40.3deg); }
        }
        @keyframes ${animations.scan} {
          0% { transform: rotate(40deg); }
          18% { transform: rotate(118deg); }
          44% { transform: rotate(232deg); }
          72% { transform: rotate(345deg); }
          88% { transform: rotate(408deg); }
          100% { transform: rotate(400deg); }
        }
        @keyframes ${animations.radar} {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ${animations.pulse} {
          0%, 100% { opacity: 0.45; transform: scale(0.94); }
          50% { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes ${animations.pathPulse} {
          0%, 100% { opacity: 0.64; }
          50% { opacity: 1; }
        }
        .${classes.needle}, .${classes.radar}, .${classes.centerPulse}, .${classes.activePath} {
          transform-box: view-box;
          transform-origin: 120px 120px;
        }
        .${classes.needle} {
          animation: ${animations.idle} 5.5s ease-in-out infinite;
        }
        .${classes.radar} {
          animation: ${animations.radar} 20s linear infinite;
          opacity: 0.09;
          transition: opacity 500ms ease;
        }
        .${classes.centerPulse} {
          animation: ${animations.pulse} 3.4s ease-in-out infinite;
        }
        .${classes.activePath} {
          animation: ${animations.pathPulse} 3.8s ease-in-out infinite;
        }
        .${classes.ring} {
          transition: stroke-opacity 500ms ease, stroke-width 500ms ease;
        }
        .${classes.root}:hover .${classes.needle} {
          animation: ${animations.scan} 2.15s cubic-bezier(0.22, 0.72, 0.18, 1) forwards;
        }
        .${classes.root}:hover .${classes.radar} {
          opacity: 0.16;
        }
        .${classes.root}:hover .${classes.ring} {
          stroke-opacity: 0.18;
        }
        @media (prefers-reduced-motion: reduce) {
          .${classes.needle}, .${classes.radar}, .${classes.centerPulse}, .${classes.activePath} {
            animation: none;
          }
          .${classes.needle} {
            transform: rotate(40deg);
          }
          .${classes.root}:hover .${classes.needle} {
            animation: none;
            transform: rotate(40deg);
          }
        }
      `}</style>

      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-labelledby={`dev-compass-title-${id} dev-compass-description-${id}`}
        className={`
          ${classes.root}
          relative z-10
          h-auto w-[90%]
          cursor-pointer
          overflow-visible
          transition-transform
          duration-700
          ease-out
          hover:scale-[1.025]
        `}
        xmlns="http://www.w3.org/2000/svg"
      >
        
        <desc id={`dev-compass-description-${id}`}>
          قطب‌نمای DevCompass که مسیرهای مختلف برنامه‌نویسی را نمایش می‌دهد و عقربه آن به سمت شمال شرقی اشاره می‌کند.
        </desc>

        <defs>
          <radialGradient id={ids.background} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.065" />
            <stop offset="58%" stopColor="#0f172a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={ids.glass} cx="34%" cy="27%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.055" />
            <stop offset="38%" stopColor="#38bdf8" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={ids.northNeedle} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#a5f3fc" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id={ids.southNeedle} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          <radialGradient id={ids.centerCore} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="32%" stopColor="#c4b5fd" />
            <stop offset="68%" stopColor="#818cf8" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={ids.radar} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
            <stop offset="65%" stopColor="#67e8f9" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.2" />
          </linearGradient>

          <filter id={ids.glow} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <circle cx="120" cy="120" r="116" fill={`url(#${ids.background})`} />
        <circle cx="120" cy="120" r="108" fill={`url(#${ids.glass})`} />

        {/* PCB traces */}
        <g aria-hidden="true" fill="none" stroke="#67e8f9" strokeWidth="0.32" strokeOpacity="0.045" strokeLinecap="round" strokeLinejoin="round">
          <path d="M120 120 H102 Q97 120 97 115 V89 Q97 84 92 84 H79" />
          <path d="M120 120 H138 Q143 120 143 115 V88 Q143 83 148 83 H162" />
          <path d="M120 120 V139 Q120 144 125 144 H154 Q159 144 159 149 V161" />
          <path d="M120 120 V141 Q120 146 115 146 H89 Q84 146 84 151 V166" />
          <circle cx="79" cy="84" r="1" fill="#67e8f9" stroke="none" />
          <circle cx="162" cy="83" r="1" fill="#67e8f9" stroke="none" />
          <circle cx="159" cy="161" r="1" fill="#67e8f9" stroke="none" />
          <circle cx="84" cy="166" r="1" fill="#67e8f9" stroke="none" />
        </g>

        {/* Rings */}
        <circle className={classes.ring} cx="120" cy="120" r="109" fill="none" stroke="#67e8f9" strokeWidth="0.42" strokeOpacity="0.075" />
        <circle cx="120" cy="120" r="94" fill="none" stroke="#38bdf8" strokeWidth="0.34" strokeOpacity="0.075" strokeDasharray="2.5 5.5" />
        <circle cx="120" cy="120" r="76" fill="#020617" fillOpacity="0.1" stroke="#67e8f9" strokeWidth="0.52" strokeOpacity="0.14" />

        {/* Radar */}
        <g className={classes.radar} aria-hidden="true">
          <path d="M120 120 L120 12 A108 108 0 0 1 196 44 Z" fill={`url(#${ids.radar})`} />
          <line x1="120" y1="120" x2="196" y2="44" stroke="#67e8f9" strokeWidth="0.5" strokeOpacity="0.16" />
        </g>

        {/* Path nodes */}
        {PROGRAMMING_PATHS.map(({ label, shortLabel, angle, color, size, importance }) => {
          const radius = 99;
          const x = 120 + radius * Math.cos(angle);
          const y = 120 + radius * Math.sin(angle);
          const lineStartRadius = 78;
          const lineStartX = 120 + lineStartRadius * Math.cos(angle);
          const lineStartY = 120 + lineStartRadius * Math.sin(angle);
          const isAI = label === "AI";

          return (
            <g key={label} className={isAI ? classes.activePath : undefined}>
              <title>{label}</title>
              <line
                x1={lineStartX}
                y1={lineStartY}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth={isAI ? 0.55 : 0.3}
                strokeOpacity={isAI ? 0.34 : 0.12}
                strokeDasharray="1.5 3"
                strokeLinecap="round"
              />
              <circle cx={x} cy={y} r={size + 3.2} fill={color} opacity={0.035 * importance} />
              <circle cx={x} cy={y} r={size} fill="#020617" fillOpacity="0.92" stroke={color} strokeWidth={isAI ? 0.9 : 0.55} strokeOpacity={0.58 * importance} />
              <circle cx={x} cy={y} r={size * 0.32} fill={color} opacity={0.82 * importance} filter={isAI ? `url(#${ids.glow})` : undefined} />
              <text
                x={x}
                y={y + 1.7}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e0f2fe"
                fontSize={shortLabel.length > 2 ? 3.3 : 4.2}
                fontWeight="800"
                fontFamily="'JetBrains Mono', 'Cascadia Code', monospace"
                opacity="0.78"
              >
                {shortLabel}
              </text>
            </g>
          );
        })}

        {/* Degree marks */}
        <g aria-hidden="true">
          {DEGREE_MARKS.map((_, index) => {
            const angle = (index / 36) * Math.PI * 2 - Math.PI / 2;
            const isPrimary = index % 9 === 0;
            const isSecondary = index % 3 === 0;
            const outerRadius = 93;
            const innerRadius = isPrimary ? 82 : isSecondary ? 86 : 89.5;

            return (
              <line
                key={index}
                x1={120 + innerRadius * Math.cos(angle)}
                y1={120 + innerRadius * Math.sin(angle)}
                x2={120 + outerRadius * Math.cos(angle)}
                y2={120 + outerRadius * Math.sin(angle)}
                stroke={isPrimary ? "#67e8f9" : "#64748b"}
                strokeWidth={isPrimary ? 1 : isSecondary ? 0.5 : 0.25}
                strokeOpacity={isPrimary ? 0.52 : isSecondary ? 0.22 : 0.11}
              />
            );
          })}

          {DIRECTIONS.map(({ label, angle, color }) => (
            <text
              key={label}
              x={120 + 58 * Math.cos(angle)}
              y={120 + 58 * Math.sin(angle) + 3}
              textAnchor="middle"
              fill={color}
              fontSize="8"
              fontWeight="800"
              fontFamily="monospace"
              opacity={label === "N" ? 0.92 : 0.68}
            >
              {label}
            </text>
          ))}
        </g>

        {/* Needle */}
        <g className={classes.needle}>
          <path
            d="M120 25 L130 107 L124 113 L120 104 L116 113 L110 107 Z"
            fill="#020617"
            opacity="0.24"
            transform="translate(1.2 1.8)"
          />
          <path
            d="M120 23 L130 107 L124 113 L120 103 L116 113 L110 107 Z"
            fill={`url(#${ids.northNeedle})`}
            opacity="0.96"
            filter={`url(#${ids.glow})`}
          />
          <path
            d="M116.2 91 L111.5 96 L116.2 101 M123.8 91 L128.5 96 L123.8 101"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <line x1="120" y1="32" x2="120" y2="103" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.42" />
          <path
            d="M120 198 L110.5 133 L116 126 L120 136 L124 126 L129.5 133 Z"
            fill={`url(#${ids.southNeedle})`}
            opacity="0.76"
          />
          <line x1="120" y1="190" x2="120" y2="136" stroke="#bfdbfe" strokeWidth="0.55" strokeOpacity="0.24" />
        </g>

        {/* Pivot + AI Core */}
        <g>
          <circle cx="120" cy="120" r="18" fill="#020617" fillOpacity="0.48" stroke="#67e8f9" strokeWidth="0.42" strokeOpacity="0.16" />
          <circle cx="120" cy="120" r="13" fill="#020617" stroke="#818cf8" strokeWidth="0.72" strokeOpacity="0.48" />
          <path
            d="M120 110 L128 115 L128 125 L120 130 L112 125 L112 115 Z"
            fill="#111827"
            stroke="#a78bfa"
            strokeWidth="0.65"
            strokeOpacity="0.52"
          />
          <g stroke="#c4b5fd" strokeWidth="0.35" strokeOpacity="0.3">
            <line x1="114" y1="116" x2="126" y2="116" />
            <line x1="114" y1="120" x2="126" y2="120" />
            <line x1="114" y1="124" x2="126" y2="124" />
          </g>
          <circle className={classes.centerPulse} cx="120" cy="120" r="7" fill={`url(#${ids.centerCore})`} />
          <circle cx="120" cy="120" r="2" fill="#ffffff" />
        </g>
      </svg>
    </>
  );
}