import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { type Product } from "../data/products";
import { inr, useStore } from "../lib/store";
import { ProductImage } from "./ProductImage";
import { RatingBadge } from "./RatingBadge";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const navigate = useNavigate();
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isInWishlist = useStore((s) => s.isInWishlist(product.id));
  const setBuyNow = useStore((s) => s.setBuyNow);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, qty: 1 });
    toast.success(`${product.name.slice(0, 30)}... added to cart!`, {
      action: {
        label: "Go to cart",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBuyNow({
      productId: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0] || "",
      brand: product.brand,
      category: product.category,
      qty: 1,
      selectedColor: product.options.colors?.[0],
      selectedSize: product.options.sizes?.[0],
      selectedStorage: product.options.storage?.[0],
    });
    navigate({ to: "/checkout" });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      toast.success("Added to Wishlist");
    } else {
      toast.info("Removed from Wishlist");
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-[8px] bg-white border border-[#E9DFC9] p-3 transition-all duration-200 hover:shadow-md hover:border-[#D4C3A3]">
      {/* Top badges & Wishlist */}
      <div className="relative w-full">
        <div className="absolute top-1 left-1 z-10 flex flex-col gap-1">
          {product.flags.bestseller && (
            <span className="rounded-[4px] bg-[#F59E0B] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.flags.deal && !product.flags.bestseller && (
            <span className="rounded-[4px] bg-[#DC2626] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Deal
            </span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          aria-label="Wishlist"
          className="absolute top-1 right-1 z-10 rounded-full bg-white/80 p-1.5 text-gray-500 backdrop-blur-sm transition-colors hover:text-[#DC2626] hover:bg-white shadow-sm"
        >
          <Heart
            size={18}
            fill={isInWishlist ? "#DC2626" : "none"}
            stroke={isInWishlist ? "#DC2626" : "currentColor"}
          />
        </button>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block w-full overflow-hidden"
        >
          <div className="aspect-square w-full py-2">
            <ProductImage
              src={product.images[0] || ""}
              alt={product.name}
              categoryName={product.category}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
          {product.brand}
        </span>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-2 text-sm font-medium text-[#1F2937] hover:text-[#0B63CE] transition-colors leading-snug"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-1.5 flex items-center">
          <RatingBadge rating={product.rating} count={product.reviewsCount} size="sm" />
        </div>

        {/* Pricing */}
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold text-[#1F2937]">
            {inr(product.price)}
          </span>
          <span className="text-xs text-[#6B7280] line-through">
            {inr(product.mrp)}
          </span>
          <span className="text-xs font-semibold text-[#16A34A]">
            {product.discount}% off
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#4B5563]">
          <span className="font-medium text-[#16A34A]">Free delivery</span>
          <span>•</span>
          <span>Stock: {product.stock > 0 ? product.stock : "Out of stock"}</span>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2 pt-1 border-t border-[#F3ECE1]">
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-[6px] bg-[#FFB020] hover:bg-[#EAA015] px-2.5 py-1.5 text-xs font-bold text-[#111827] shadow-sm transition-all active:scale-95"
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
          {!compact && (
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-1 rounded-[6px] bg-[#F97316] hover:bg-[#EA580C] px-2.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
            >
              <Zap size={14} />
              <span>Buy Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
