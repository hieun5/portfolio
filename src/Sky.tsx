import { useId } from "react";
import cloud3 from "./assets/sky/cloud-3.webp";
import cloud5 from "./assets/sky/cloud-5.webp";
import cloud11 from "./assets/sky/cloud-11.webp";
import cloud19 from "./assets/sky/cloud-19.webp";

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
      <div className="starfield starfield--near">
        <svg className="star-twinkle" viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice">
          {stars.filter((_, index) => index % 11 === 0).map((star, index) => (
            <g key={index} opacity={0.6 + random(index, 5) * 0.4}>
              <circle cx={star.x} cy={star.y} r="2" fill="#f4f7ff" />
              <path d={`M${star.x - 5} ${star.y}h10M${star.x} ${star.y - 5}v10`} stroke="#d7e7ff" strokeWidth="0.65" opacity="0.55" />
            </g>
          ))}
        </svg>
      </div>
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

const clouds: Record<number, string> = { 3: cloud3, 5: cloud5, 11: cloud11, 19: cloud19 };

export function CloudBank({ className = "", seed = 3 }: { className?: string; seed?: number }) {
  return (
    <img
      className={`cloud-bank ${className}`}
      src={clouds[seed] ?? cloud3}
      width={800}
      height={320}
      alt=""
      aria-hidden="true"
      decoding="async"
      loading={seed === 3 ? "eager" : "lazy"}
    />
  );
}
