import { useId } from "react";

const PROGRAMMING_PATHS = [
  { label: "Frontend", angle: -Math.PI / 2 + 0.28, color: "#67e8f9", size: 5.2, glow: 0.9  },
  { label: "Backend",  angle: -Math.PI / 2 + 1.08, color: "#3b82f6", size: 5.0, glow: 0.85 },
  { label: "AI",       angle: -Math.PI / 2 + 1.88, color: "#a78bfa", size: 6.6, glow: 1.15 },
  { label: "GameDev",  angle: -Math.PI / 2 + 2.68, color: "#f472b6", size: 4.9, glow: 0.8  },
  { label: "DevOps",   angle: -Math.PI / 2 - 2.38, color: "#4ade80", size: 4.8, glow: 0.78 },
  { label: "Cloud",    angle: -Math.PI / 2 - 1.58, color: "#7dd3fc", size: 5.0, glow: 0.82 },
  { label: "Mobile",   angle: -Math.PI / 2 - 0.78, color: "#2dd4bf", size: 4.8, glow: 0.78 },
  { label: "Data",     angle: -Math.PI / 2 - 0.08, color: "#fb923c", size: 5.0, glow: 0.82 },
];

export default function DevCompassPremium() {
  const id = useId().replace(/:/g, "");

  const g = {
    bg: `bg-${id}`,
    glass: `glass-${id}`,
    core: `core-${id}`,
    needle: `needle-${id}`,
    radar: `radar-${id}`,
  };

  return (
    <>
      <style>{`
        .needle-group, .radar-lg, .radar-md, .radar-sm {
          transform-box: view-box;
          transform-origin: 120px 120px;
        }

        @keyframes idle {
          0%, 100% { transform: rotate(39.8deg); }
          50%      { transform: rotate(40.2deg); }
        }
        .needle-group { animation: idle 7s ease-in-out infinite; }

        @keyframes scan {
          0%   { transform: rotate(40deg); }
          26%  { transform: rotate(130deg); }
          56%  { transform: rotate(250deg); }
          80%  { transform: rotate(340deg); }
          100% { transform: rotate(40deg); }
        }
        .dev-compass:hover .needle-group {
          animation: scan 3.1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinR { to { transform: rotate(-360deg); } }

        .radar-lg { animation: spin 36s linear infinite; opacity: 0.055; }
        .radar-md { animation: spinR 23s linear infinite; opacity: 0.07; }
        .radar-sm { animation: spin 16s linear infinite; opacity: 0.055; }

        .dev-compass:hover .radar-lg { opacity: 0.12; transition: opacity 1s ease; }
        .dev-compass:hover .radar-md { opacity: 0.14; transition: opacity 1s ease; }
        .dev-compass:hover .radar-sm { opacity: 0.1;  transition: opacity 1s ease; }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.7; }
        }
        .core-glow { animation: pulse 4.2s ease-in-out infinite; }

        @keyframes breath {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }
        .node-core { animation: breath 6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .needle-group, .radar-lg, .radar-md, .radar-sm, .core-glow, .node-core {
            animation: none;
          }
          .dev-compass:hover .needle-group {
            animation: none;
            transform: rotate(40deg);
          }
        }
      `}</style>

      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-label="DevCompass – AI programming path finder"
        className="dev-compass relative z-10 h-auto w-[90%] cursor-pointer overflow-visible transition-transform duration-700 ease-out hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={g.bg} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.03" />
            <stop offset="75%" stopColor="#0f172a" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={g.glass} cx="28%" cy="24%" r="72%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={g.needle} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
          </linearGradient>

          <radialGradient id={g.core} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="40%" stopColor="#c4b5fd" />
            <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5b21b6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={g.radar} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </linearGradient>

          <filter id={`bloom-${id}`} x="-18%" y="-18%" width="136%" height="136%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <circle cx="120" cy="120" r="118" fill={`url(#${g.bg})`} />
        <circle cx="120" cy="120" r="110" fill={`url(#${g.glass})`} />

        {/* Minimal PCB – only 4 elegant traces */}
        <g opacity="0.04" stroke="#67e8f9" fill="none" strokeWidth="0.38" strokeLinecap="round">
          <path d="M120 120 C105 95 92 78 81 68" />
          <path d="M120 120 C137 92 152 76 163 68" />
          <path d="M120 120 C148 115 162 122 172 132" />
          <path d="M120 120 C95 148 80 160 68 172" />
          <circle cx="81" cy="68" r="0.85" fill="#67e8f9" stroke="none" />
          <circle cx="163" cy="68" r="0.85" fill="#67e8f9" stroke="none" />
          <circle cx="172" cy="132" r="0.85" fill="#67e8f9" stroke="none" />
          <circle cx="68" cy="172" r="0.85" fill="#67e8f9" stroke="none" />
        </g>

        {/* Rings – fewer, clearer hierarchy */}
        <circle cx="120" cy="120" r="112" fill="none" stroke="#67e8f9" strokeWidth="0.26" strokeOpacity="0.05" />
        <circle cx="120" cy="120" r="100" fill="none" stroke="#38bdf8" strokeWidth="0.24" strokeOpacity="0.045" strokeDasharray="2.6 5" />
        <circle cx="120" cy="120" r="88"  fill="none" stroke="#67e8f9" strokeWidth="0.36" strokeOpacity="0.065" strokeDasharray="1 4.2" strokeLinecap="round" />
        <circle cx="120" cy="120" r="75"  fill="#020617" fillOpacity="0.05" stroke="#67e8f9" strokeWidth="0.42" strokeOpacity="0.1" />
        <circle cx="120" cy="120" r="63"  fill="none" stroke="#60a5fa" strokeWidth="0.18" strokeOpacity="0.05" strokeDasharray="0.55 2.3" strokeLinecap="round" />

        {/* Radar */}
        <g className="radar-lg" aria-hidden="true">
          <path d="M120 120 L120 8 A112 112 0 0 1 232 120 Z" fill={`url(#${g.radar})`} />
        </g>
        <g className="radar-md" aria-hidden="true">
          <path d="M120 120 L120 34 A86 86 0 0 1 206 120 Z" fill={`url(#${g.radar})`} />
        </g>
        <g className="radar-sm" aria-hidden="true">
          <path d="M120 120 L120 54 A66 66 0 0 1 186 120 Z" fill={`url(#${g.radar})`} />
        </g>

        {/* Nodes */}
        {PROGRAMMING_PATHS.map(({ label, angle, color, size, glow }) => {
          const r = 98.5;
          const ld = 27.5;
          const x = 120 + r * Math.cos(angle);
          const y = 120 + r * Math.sin(angle);

          return (
            <g key={label}>
              <line
                x1={120 + 68 * Math.cos(angle)}
                y1={120 + 68 * Math.sin(angle)}
                x2={x}
                y2={y}
                stroke={color}
                strokeWidth="0.3"
                strokeOpacity="0.15"
                strokeDasharray="1.2 2.2"
                strokeLinecap="round"
              />
              <circle cx={x} cy={y} r={size + 2.3} fill={color} opacity={0.045 * glow} />
              <circle
                cx={x} cy={y} r={size}
                fill="#020617" fillOpacity="0.9"
                stroke={color} strokeWidth="0.65" strokeOpacity={0.65 * glow}
              />
              <circle
                className="node-core"
                cx={x} cy={y} r={size * 0.34}
                fill={color} opacity={0.82 * glow}
                filter={`url(#bloom-${id})`}
              />
              <text
                x={x + ld * Math.cos(angle)}
                y={y + ld * Math.sin(angle) + 1.7}
                textAnchor="middle"
                fontSize="7"
                fontWeight="600"
                fill={color}
                fontFamily="'SF Mono', 'Cascadia Code', 'JetBrains Mono', monospace"
                opacity="0.8"
                letterSpacing="0.4"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Degree ticks – only primaries + secondaries */}
        <g aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
            const isPrimary = i % 6 === 0;
            const outerR = 95;
            const innerR = isPrimary ? 79.5 : 86;
            return (
              <line
                key={i}
                x1={120 + innerR * Math.cos(angle)}
                y1={120 + innerR * Math.sin(angle)}
                x2={120 + outerR * Math.cos(angle)}
                y2={120 + outerR * Math.sin(angle)}
                stroke={isPrimary ? "#67e8f9" : "#64748b"}
                strokeWidth={isPrimary ? 0.95 : 0.35}
                strokeOpacity={isPrimary ? 0.5 : 0.18}
              />
            );
          })}
          {["N", "E", "S", "W"].map((dir, i) => {
            const angle = -Math.PI / 2 + (i * Math.PI) / 2;
            return (
              <text
                key={dir}
                x={120 + 52 * Math.cos(angle)}
                y={120 + 52 * Math.sin(angle) + 2.8}
                textAnchor="middle"
                fill={dir === "N" ? "#e0f2fe" : "#67e8f9"}
                fontSize="8.2"
                fontWeight="700"
                fontFamily="monospace"
                opacity="0.7"
              >
                {dir}
              </text>
            );
          })}
        </g>

        {/* Needle – unified elegant form */}
        <g className="needle-group" filter={`url(#bloom-${id})`}>
          {/* single continuous shape that reads as refined </> */}
          <path
            d="M120 28
               L131 48
               L124 52
               L120 44
               L116 52
               L109 48
               Z"
            fill={`url(#${g.needle})`}
            opacity="0.9"
          />
          {/* center stem – stops well before chip */}
          <line
            x1="114" y1="90"
            x2="126" y2="126"
            stroke={`url(#${g.needle})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.78"
          />
          <line
            x1="115.2" y1="92"
            x2="124.8" y2="124"
            stroke="#fff"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.2"
          />
          {/* south tip */}
          <path
            d="M120 212
               L109 192
               L116 188
               L120 196
               L124 188
               L131 192
               Z"
            fill={`url(#${g.needle})`}
            opacity="0.78"
          />
        </g>

        {/* AI Chip – clear hero */}
        <g>
          <circle
            cx="120" cy="120" r="22.5"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.28"
            strokeOpacity="0.11"
            strokeDasharray="1.5 2.5"
          />

          <rect
            x="108" y="108"
            width="24" height="24"
            rx="2.6"
            fill="#0f172a"
            fillOpacity="0.96"
            stroke="#a78bfa"
            strokeWidth="0.7"
            strokeOpacity="0.58"
          />

          <rect
            x="111" y="111"
            width="18" height="18"
            rx="1.5"
            fill="#1e1b4b"
            stroke="#c4b5fd"
            strokeWidth="0.35"
            strokeOpacity="0.4"
          />

          {/* pins */}
          <g stroke="#a78bfa" strokeWidth="0.85" strokeLinecap="round" opacity="0.42">
            <line x1="108" y1="113.5" x2="105" y2="113.5" />
            <line x1="108" y1="120"   x2="105" y2="120" />
            <line x1="108" y1="126.5" x2="105" y2="126.5" />
            <line x1="132" y1="113.5" x2="135" y2="113.5" />
            <line x1="132" y1="120"   x2="135" y2="120" />
            <line x1="132" y1="126.5" x2="135" y2="126.5" />
          </g>

          {/* micro lines */}
          <g stroke="#c4b5fd" strokeWidth="0.3" strokeOpacity="0.28" fill="none">
            <path d="M114.5 114.5 H125.5" />
            <path d="M114.5 120 H125.5" />
            <path d="M114.5 125.5 H125.5" />
            <path d="M117 114.5 V125.5" />
            <path d="M123 114.5 V125.5" />
          </g>

          <circle
            className="core-glow"
            cx="120" cy="120"
            r="5"
            fill={`url(#${g.core})`}
            filter={`url(#bloom-${id})`}
          />
          <circle cx="120" cy="120" r="1.55" fill="#fff" opacity="0.95" />

          <text
            x="120" y="131.2"
            textAnchor="middle"
            fill="#c4b5fd"
            fontSize="4"
            fontWeight="700"
            fontFamily="monospace"
            letterSpacing="0.45"
            opacity="0.75"
          >
            AI
          </text>
        </g>

        {/* Bottom HUD – clearer */}
        <g aria-hidden="true">
          <text
            x="120" y="228.5"
            textAnchor="middle"
            fill="#67e8f9"
            fontSize="4.5"
            fontWeight="600"
            fontFamily="monospace"
            letterSpacing="0.85"
            opacity="0.58"
          >
            FIND YOUR PATH
          </text>
          <rect
            x="93" y="234"
            width="54" height="7.2"
            rx="3.6"
            fill="#020617"
            fillOpacity="0.5"
            stroke="#67e8f9"
            strokeWidth="0.25"
            strokeOpacity="0.16"
          />
          <text
            x="120" y="239.5"
            textAnchor="middle"
            fill="#bae6fd"
            fontSize="4"
            fontWeight="700"
            fontFamily="monospace"
            letterSpacing="0.65"
            opacity="0.65"
          >
            DEV·COMPASS
          </text>
        </g>
      </svg>
    </>
  );
}