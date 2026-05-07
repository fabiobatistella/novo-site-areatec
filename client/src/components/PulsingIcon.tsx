import { type LucideIcon } from "lucide-react";

interface PulsingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export function PulsingIcon({ icon: Icon, size = 16, className = "" }: PulsingIconProps) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-[#0ABAB5]/20 animate-tiffany-pulse" />
      <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#0ABAB5]/10">
        <Icon size={size} className="text-[#0ABAB5] animate-tiffany-glow" />
      </span>
    </span>
  );
}

export function PulsingDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="w-2.5 h-2.5 rounded-full bg-[#0ABAB5] animate-tiffany-glow" />
      <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#0ABAB5]/40 animate-tiffany-pulse" />
    </span>
  );
}

export function TiffanyBadge({ children, icon: Icon, className = "" }: { children: React.ReactNode; icon?: LucideIcon; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0ABAB5]/8 border border-[#0ABAB5]/20 backdrop-blur-sm ${className}`}>
      {Icon ? (
        <PulsingIcon icon={Icon} size={14} />
      ) : (
        <PulsingDot />
      )}
      <span className="text-sm font-medium text-[#0ABAB5] font-['Barlow_Condensed']">{children}</span>
    </div>
  );
}
