import React, { useState } from "react";
import { Package, Smartphone, Laptop, Watch, Shirt, ShoppingBag, Utensils, Armchair, Sparkles, Dumbbell, Apple, Bike, ToyBrick } from "lucide-react";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  categoryName?: string;
  categorySlug?: string;
  aspectRatio?: "square" | "banner" | "wide" | "auto";
  containerClassName?: string;
  className?: string;
}

const CATEGORY_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  "mobiles-accessories": Smartphone,
  "laptops-computers": Laptop,
  "electronics-gadgets": Watch,
  "mens-fashion": Shirt,
  "womens-fashion": ShoppingBag,
  "home-kitchen": Utensils,
  "furniture-decor": Armchair,
  "beauty-personal-care": Sparkles,
  "sports-fitness": Dumbbell,
  "grocery": Apple,
  "vehicles-motorcycles": Bike,
  "kids-toys": ToyBrick,
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  "mobiles-accessories": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", iconBg: "bg-blue-100" },
  "laptops-computers": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", iconBg: "bg-indigo-100" },
  "electronics-gadgets": { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", iconBg: "bg-cyan-100" },
  "mens-fashion": { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", iconBg: "bg-slate-100" },
  "womens-fashion": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", iconBg: "bg-pink-100" },
  "home-kitchen": { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", iconBg: "bg-emerald-100" },
  "furniture-decor": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", iconBg: "bg-purple-100" },
  "beauty-personal-care": { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", iconBg: "bg-rose-100" },
  "sports-fitness": { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", iconBg: "bg-orange-100" },
  "grocery": { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", iconBg: "bg-green-100" },
  "vehicles-motorcycles": { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", iconBg: "bg-red-100" },
  "kids-toys": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", iconBg: "bg-amber-100" },
};

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  categoryName = "KartNest",
  categorySlug = "",
  aspectRatio = "square",
  containerClassName = "",
  className = "",
  loading = "lazy",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aspect ratio classes for fixed layout container (prevents CLS)
  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "banner"
      ? "aspect-[16/5]"
      : aspectRatio === "wide"
      ? "aspect-[4/3]"
      : "";

  const theme = CATEGORY_COLORS[categorySlug] || {
    bg: "bg-[#FAF5EB]",
    border: "border-[#E9DFC9]",
    text: "text-[#4B5563]",
    iconBg: "bg-[#F3ECE1]",
  };

  const IconComponent = CATEGORY_ICONS[categorySlug] || Package;

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-3 text-center select-none rounded-[6px] border ${theme.bg} ${theme.border} ${aspectClass} ${containerClassName}`}
        role="img"
        aria-label={alt || `${categoryName} product image`}
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-full mb-1.5 ${theme.iconBg} ${theme.text}`}>
          <IconComponent size={20} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.text} truncate max-w-full px-2`}>
          {categoryName}
        </span>
        <span className="text-[9px] text-gray-500 line-clamp-1 px-1 mt-0.5 font-medium">
          {alt || "KartNest Certified"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-[6px] ${aspectClass} ${containerClassName}`}
    >
      {/* Skeleton loader while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-[6px]" />
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
};
