import { useId } from "react";
import type { CSSProperties } from "react";

function random(index: number, seed: number) {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const stars = Array.from({ length: 230 }, (_, index) => ({
  x: random(index, 1) * 1600,
  y: random(index, 2) * 1100,
  radius: 0.45 + random(index, 3) * 1.15,
  opacity: 0.25 + random(index, 4) * 0.65,
}));

export function SkyBackdrop() {
  const moonId = useId();
  return (
    <div className="sky-backdrop" aria-hidden="true">
      <div className="sky-glow" />
      <svg className="starfield starfield--far" viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice">
        {stars.map((star, index) => (
          <circle key={index} cx={star.x} cy={star.y} r={star.radius} fill={index % 6 === 0 ? "#c2d7ff" : "#f4f5ff"} opacity={star.opacity} />
        ))}
      </svg>
      <svg className="starfield starfield--near" viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice">
        {stars.filter((_, index) => index % 11 === 0).map((star, index) => (
          <g
            className="bright-star"
            key={index}
            style={{ "--twinkle-delay": `${-index * 0.7}s` } as CSSProperties}
          >
            <circle cx={star.x} cy={star.y} r="2" fill="#f4f7ff" />
            <path d={`M${star.x - 5} ${star.y}h10M${star.x} ${star.y - 5}v10`} stroke="#d7e7ff" strokeWidth="0.65" opacity="0.55" />
          </g>
        ))}
      </svg>
      <div className="moon">
        <svg viewBox="0 0 100 100">
          <defs>
            <mask id={moonId}>
              <rect width="100" height="100" fill="white" />
              <circle cx="63" cy="37" r="29" fill="black" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="29" fill="#e4ebfa" mask={`url(#${moonId})`} />
        </svg>
      </div>
    </div>
  );
}

export function CloudBank({ className = "", seed = 7 }: { className?: string; seed?: number }) {
  const id = useId();
  const silhouette = "M-100 350C-55 259 20 263 75 298C49 206 148 157 220 221C247 111 391 100 465 201C496 153 571 154 626 214C686 98 854 89 928 209C985 133 1104 145 1154 237C1209 175 1298 194 1324 261C1393 199 1477 205 1510 278C1593 211 1691 246 1710 345V700H-100Z";
  return (
    <svg className={`cloud-bank ${className}`} viewBox="0 0 1600 640" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9aabc6" />
          <stop offset="0.25" stopColor="#647d9e" />
          <stop offset="0.58" stopColor="#2e4668" />
          <stop offset="1" stopColor="#12223b" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-light`}>
          <stop stopColor="#a5b7cf" stopOpacity="0.48" />
          <stop offset="1" stopColor="#5c7596" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#132842" stopOpacity="0.7" />
          <stop offset="1" stopColor="#203957" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><path d={silhouette} /></clipPath>
        <filter id={`${id}-soft`} x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.021" numOctaves="3" seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter={`url(#${id}-soft)`}>
        <path d={silhouette} fill={`url(#${id}-body)`} />
        <g clipPath={`url(#${id}-clip)`}>
          <ellipse cx="350" cy="230" rx="250" ry="145" fill={`url(#${id}-light)`} />
          <ellipse cx="820" cy="210" rx="280" ry="140" fill={`url(#${id}-light)`} />
          <ellipse cx="1280" cy="285" rx="250" ry="150" fill={`url(#${id}-light)`} />
          <ellipse cx="100" cy="405" rx="230" ry="120" fill={`url(#${id}-shadow)`} />
          <ellipse cx="570" cy="365" rx="270" ry="150" fill={`url(#${id}-shadow)`} />
          <ellipse cx="1070" cy="410" rx="280" ry="155" fill={`url(#${id}-shadow)`} />
          <ellipse cx="1510" cy="430" rx="250" ry="130" fill={`url(#${id}-shadow)`} />
        </g>
      </g>
    </svg>
  );
}
