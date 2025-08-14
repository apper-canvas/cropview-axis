import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    planted: "bg-gradient-to-r from-fresh-green/20 to-success-green/20 text-fresh-green border border-fresh-green/20",
    harvested: "bg-gradient-to-r from-harvest-orange/20 to-yellow-400/20 text-harvest-orange border border-harvest-orange/20",
    fallow: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 border border-gray-300",
    success: "bg-gradient-to-r from-success-green/20 to-green-500/20 text-success-green border border-success-green/20",
    warning: "bg-gradient-to-r from-warning-orange/20 to-orange-500/20 text-warning-orange border border-warning-orange/20",
    error: "bg-gradient-to-r from-error-red/20 to-red-500/20 text-error-red border border-error-red/20"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;