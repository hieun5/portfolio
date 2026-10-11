export function Sculpture() {
  return (
    <svg className="sculpture" viewBox="0 0 480 430" aria-hidden="true">
      <defs>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".16" stopColor="#bcc2b5" />
          <stop offset=".35" stopColor="#d7ddcd" />
          <stop offset=".5" stopColor="#68715f" />
          <stop offset=".7" stopColor="#e6eada" />
          <stop offset=".85" stopColor="#939d88" />
          <stop offset="1" stopColor="#f9fbf2" />
        </linearGradient>
        <linearGradient id="green" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f0ffb3" />
          <stop offset=".3" stopColor="#d5ef72" />
          <stop offset=".7" stopColor="#8da535" />
          <stop offset="1" stopColor="#d5ef72" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="ringShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="10"
            floodColor="#3c4730"
            floodOpacity=".18"
          />
        </filter>
      </defs>
      <ellipse
        cx="239"
        cy="368"
        rx="122"
        ry="16"
        fill="#b7ef62"
        opacity=".13"
        filter="url(#shadow)"
      />
      <g filter="url(#ringShadow)">
        <ellipse
          cx="237"
          cy="205"
          rx="98"
          ry="135"
          transform="rotate(40 237 205)"
          fill="none"
          stroke="url(#green)"
          strokeWidth="55"
        />
        <ellipse
          cx="243"
          cy="206"
          rx="117"
          ry="86"
          transform="rotate(-43 243 206)"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="57"
        />
        <path
          d="M159 72C114 105 119 174 156 225"
          fill="none"
          stroke="url(#green)"
          strokeWidth="55"
          strokeLinecap="round"
        />
        <path
          d="M160 79C124 108 126 169 161 215"
          fill="none"
          stroke="#efffb1"
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".8"
        />
        <path
          d="M143 277C167 306 219 306 270 275"
          fill="none"
          stroke="#f4f7ed"
          strokeWidth="3"
          opacity=".8"
        />
      </g>
      <path
        d="M393 130h15m-7.5-7.5v15M68 283h12m-6-6v12"
        stroke="#939c84"
        strokeWidth="1.2"
      />
    </svg>
  );
}
