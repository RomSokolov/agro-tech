import { cn } from "@/lib/utils";

type EquipmentVisualProps = {
  category: string;
  seed?: string;
  className?: string;
  label?: string;
};

const GRADIENTS: [string, string][] = [
  ["#245530", "#4f8d5c"],
  ["#1d4427", "#2f6b3c"],
  ["#163420", "#447a52"],
  ["#22513a", "#5a9168"],
];

function hash(value: string): number {
  let total = 0;
  for (let i = 0; i < value.length; i += 1) {
    total = (total + value.charCodeAt(i) * (i + 7)) % 9973;
  }
  return total;
}

function Silhouette({ category }: { category: string }) {
  const fill = "rgba(255,255,255,0.82)";
  const soft = "rgba(255,255,255,0.4)";

  switch (category) {
    case "harvesters":
      return (
        <g>
          <circle cx="138" cy="150" r="40" fill={fill} />
          <circle cx="138" cy="150" r="15" fill={soft} />
          <circle cx="244" cy="154" r="26" fill={fill} />
          <circle cx="244" cy="154" r="9" fill={soft} />
          <path
            d="M78 78 H236 a14 14 0 0 1 14 14 V150 H64 V92 a14 14 0 0 1 14-14Z"
            fill={fill}
          />
          <rect x="212" y="44" width="50" height="40" rx="6" fill={fill} />
          <path d="M30 132 L78 132 L78 104 L48 104 Z" fill={fill} />
          <circle cx="52" cy="120" r="16" fill={soft} />
        </g>
      );
    case "sprayers":
      return (
        <g>
          <rect x="18" y="150" width="284" height="7" rx="3.5" fill={fill} />
          {[44, 92, 160, 228, 276].map((x) => (
            <rect key={x} x={x} y="157" width="5" height="16" rx="2.5" fill={soft} />
          ))}
          <ellipse cx="104" cy="120" rx="14" ry="44" fill={fill} />
          <ellipse cx="218" cy="120" rx="14" ry="44" fill={fill} />
          <rect x="116" y="52" width="104" height="58" rx="12" fill={fill} />
          <rect x="196" y="26" width="46" height="34" rx="6" fill={fill} />
        </g>
      );
    case "seeders":
      return (
        <g>
          <rect x="44" y="116" width="240" height="13" rx="6" fill={fill} />
          <path d="M122 116 L134 62 H214 L226 116 Z" fill={fill} />
          {[66, 116, 166, 216, 262].map((x) => (
            <g key={x}>
              <rect x={x} y="129" width="9" height="26" fill={soft} />
              <circle cx={x + 4.5} cy="160" r="9" fill={fill} />
            </g>
          ))}
          <path d="M44 122 L14 150 L44 150 Z" fill={fill} />
        </g>
      );
    case "tillage":
      return (
        <g>
          <rect x="48" y="74" width="226" height="14" rx="6" fill={fill} />
          {[70, 108, 146, 184, 222, 258].map((x, i) => (
            <g key={x}>
              <rect x={x + 8} y="88" width="5" height="30" fill={soft} />
              <ellipse
                cx={x + 10}
                cy={132}
                rx="22"
                ry="20"
                fill={i % 2 === 0 ? fill : soft}
              />
            </g>
          ))}
          <path d="M48 80 L16 108 L48 108 Z" fill={fill} />
        </g>
      );
    case "loaders":
      return (
        <g>
          <circle cx="118" cy="152" r="34" fill={fill} />
          <circle cx="118" cy="152" r="12" fill={soft} />
          <circle cx="222" cy="152" r="34" fill={fill} />
          <circle cx="222" cy="152" r="12" fill={soft} />
          <rect x="100" y="86" width="148" height="56" rx="10" fill={fill} />
          <rect x="150" y="54" width="74" height="40" rx="6" fill={fill} />
          <path d="M208 104 L70 70 L58 86 L196 126 Z" fill={fill} />
          <path d="M58 86 L34 78 L30 116 L62 108 Z" fill={soft} />
        </g>
      );
    default:
      // tractors
      return (
        <g>
          <circle cx="216" cy="142" r="44" fill={fill} />
          <circle cx="216" cy="142" r="17" fill={soft} />
          <circle cx="96" cy="154" r="27" fill={fill} />
          <circle cx="96" cy="154" r="10" fill={soft} />
          <path
            d="M58 146 V112 a6 6 0 0 1 6-6 H132 V72 a8 8 0 0 1 8-8 H212 a8 8 0 0 1 8 8 V146 Z"
            fill={fill}
          />
          <rect x="120" y="70" width="8" height="40" rx="3" fill={soft} />
        </g>
      );
  }
}

export function EquipmentVisual({
  category,
  seed = category,
  className,
  label,
}: EquipmentVisualProps) {
  const id = `g-${category}-${hash(seed)}`;
  const [from, to] = GRADIENTS[hash(seed) % GRADIENTS.length];

  return (
    <div className={cn("relative overflow-hidden bg-brand-700", className)}>
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={label ?? `${category} illustration`}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#${id})`} />
        {[150, 168, 186].map((y, i) => (
          <path
            key={y}
            d={`M-10 ${y} Q 80 ${y - 14 - i * 4} 170 ${y} T 340 ${y}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
        ))}
        <Silhouette category={category} />
      </svg>
    </div>
  );
}
