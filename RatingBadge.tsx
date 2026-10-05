import React from "react";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  count,
  size = "sm",
}) => {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs font-semibold",
    md: "px-2 py-0.5 text-sm font-semibold",
    lg: "px-2.5 py-1 text-base font-bold",
  };

  const starSizes = {
    sm: 11,
    md: 13,
    lg: 15,
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-0.5 rounded-[4px] bg-[#388E3C] text-white ${sizeClasses[size]}`}
      >
        <span>{rating.toFixed(1)}</span>
        <Star size={starSizes[size]} fill="currentColor" stroke="none" />
      </span>
      {count !== undefined && (
        <span className="text-xs text-[#6B7280]">
          ({count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
};
