// AreatecLogo — SVG logo component traced from official brand logo image
// Symbol: stylized "a" traced from areatec_logo_oficial.jpg
// Two shapes: right stem+hook and left body
// Wordmark: "Areatec" in Barlow Condensed
// Variants: colored (blue #2F6FD0), light (white), dark (black/dark)

interface AreatecLogoProps {
  variant?: "colored" | "light" | "dark";
  showWordmark?: boolean;
  className?: string;
  symbolSize?: number;
  wordmarkSize?: string;
}

export function AreatecSymbol({
  variant = "colored",
  size = 36,
  className = "",
}: {
  variant?: "colored" | "light" | "dark";
  size?: number;
  className?: string;
}) {
  const fillColor =
    variant === "colored"
      ? "#2F6FD0"
      : variant === "light"
        ? "#FFFFFF"
        : "#21212D";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 316 316"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Right stem + top hook - traced from official logo */}
      <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
      {/* Left body - traced from official logo */}
      <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
    </svg>
  );
}

export default function AreatecLogo({
  variant = "colored",
  showWordmark = true,
  className = "",
  symbolSize = 36,
  wordmarkSize = "text-lg",
}: AreatecLogoProps) {
  const fillColor =
    variant === "colored"
      ? "#2F6FD0"
      : variant === "light"
        ? "#FFFFFF"
        : "#21212D";

  const textColor =
    variant === "colored"
      ? "text-[#2F6FD0]"
      : variant === "light"
        ? "text-white"
        : "text-[#21212D]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Symbol SVG - traced from official brand logo image */}
      <svg
        width={symbolSize}
        height={symbolSize}
        viewBox="0 0 316 316"
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Right stem + top hook */}
        <path d="M 271 0 L 281 2 L 290 6 L 296 10 L 305 19 L 305 20 L 307 22 L 308 25 L 311 29 L 312 34 L 313 35 L 313 38 L 314 39 L 314 44 L 315 45 L 315 271 L 314 272 L 314 277 L 313 278 L 311 286 L 307 293 L 304 296 L 304 297 L 296 305 L 290 309 L 281 313 L 271 315 L 240 315 L 240 97 L 239 96 L 238 90 L 234 85 L 234 84 L 230 80 L 222 76 L 128 75 L 117 72 L 109 67 L 102 60 L 102 59 L 98 54 L 98 52 L 96 48 L 96 45 L 95 44 L 95 31 L 96 30 L 96 27 L 97 26 L 97 24 L 100 18 L 102 16 L 102 14 L 104 13 L 110 7 L 119 2 L 128 0 Z" />
        {/* Left body */}
        <path d="M 181 115 L 190 119 L 195 124 L 195 125 L 198 129 L 199 135 L 200 136 L 200 143 L 199 144 L 199 315 L 90 315 L 70 311 L 59 307 L 51 303 L 39 295 L 24 281 L 24 280 L 17 272 L 15 268 L 13 266 L 8 256 L 8 254 L 5 248 L 4 243 L 3 242 L 3 239 L 2 238 L 2 235 L 1 234 L 1 228 L 0 227 L 0 203 L 1 202 L 2 192 L 3 191 L 3 188 L 4 187 L 4 185 L 5 184 L 7 176 L 13 164 L 24 149 L 35 138 L 49 128 L 61 122 L 73 118 L 90 115 Z" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`${wordmarkSize} font-semibold tracking-tight ${textColor}`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Areatec
        </span>
      )}
    </div>
  );
}
