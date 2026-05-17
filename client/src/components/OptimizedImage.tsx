// OptimizedImage — WebP with fallback and lazy loading
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}

/**
 * Renders a <picture> element with WebP source and original format fallback.
 * Automatically derives the .webp path from the original src.
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Derive webp path: /assets/image.jpg -> /assets/image.webp
  const ext = src.split(".").pop()?.toLowerCase() || "";
  const hasWebp = ["jpg", "jpeg", "png"].includes(ext);
  const webpSrc = hasWebp ? src.replace(/\.(jpg|jpeg|png)$/i, ".webp") : null;

  return (
    <div className="relative w-full h-full">
      {/* Skeleton placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 animate-pulse transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <source srcSet={src} type={`image/${ext === "png" ? "png" : "jpeg"}`} />
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          className={`${className} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </picture>
    </div>
  );
}
