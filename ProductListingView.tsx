import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Filter,
  X,
  ChevronDown,
  ArrowUpDown,
  Check,
  Star,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, type Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { inr } from "../lib/store";

interface ProductListingViewProps {
  title: string;
  subtitle?: string;
  initialCategorySlug?: string;
  searchQuery?: string;
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

export const ProductListingView: React.FC<ProductListingViewProps> = ({
  title,
  subtitle,
  initialCategorySlug,
  searchQuery = "",
}) => {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategorySlug || "all"
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const MAX_CATALOG_PRICE = 5000000;
  const [maxPrice, setMaxPrice] = useState<number>(MAX_CATALOG_PRICE);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 24;

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available subcategories for current category
  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  // Base list filtered by category and search query
  const baseCategoryProducts = useMemo(() => {
    let list = PRODUCTS;
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  // Brands present in current filtered set
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    baseCategoryProducts.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet).slice(0, 15);
  }, [baseCategoryProducts]);

  // Apply all filters
  const filteredProducts = useMemo(() => {
    return baseCategoryProducts.filter((p) => {
      if (
        selectedSubcategories.length > 0 &&
        !selectedSubcategories.includes(p.subcategory)
      ) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      if (minDiscount > 0 && p.discount < minDiscount) {
        return false;
      }
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    });
  }, [
    baseCategoryProducts,
    selectedSubcategories,
    selectedBrands,
    maxPrice,
    minRating,
    minDiscount,
    inStockOnly,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => (b.flags.new ? 1 : 0) - (a.flags.new ? 1 : 0));
      case "relevance":
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Total pages
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, currentPage]);

  const handleSubcategoryToggle = (sub: string) => {
    setCurrentPage(1);
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleBrandToggle = (b: string) => {
    setCurrentPage(1);
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setMaxPrice(MAX_CATALOG_PRICE);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedSubcategories.length > 0 ||
    selectedBrands.length > 0 ||
    maxPrice < MAX_CATALOG_PRICE ||
    minRating > 0 ||
    minDiscount > 0 ||
    inStockOnly;

  // Filter Sidebar UI
  const FilterContent = (
    <div className="space-y-6 text-sm text-gray-800">
      {/* Category selection */}
      {!initialCategorySlug && (
        <div className="border-b border-[#E9DFC9] pb-4">
          <h4 className="font-bold text-gray-900 mb-2">Category</h4>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategories([]);
              setSelectedBrands([]);
              setCurrentPage(1);
            }}
            className="w-full rounded border border-[#E9DFC9] bg-white p-2 text-xs font-medium outline-none"
          >
            <option value="all">All Departments ({PRODUCTS.length})</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Subcategories (if active category has them) */}
      {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
        <div className="border-b border-[#E9DFC9] pb-4">
          <h4 className="font-bold text-gray-900 mb-2">Subcategories</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {activeCategoryObj.subcategories.map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2 cursor-pointer text-xs hover:text-[#0B63CE]"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => handleSubcategoryToggle(sub)}
                  className="rounded border-gray-300 text-[#0B63CE] focus:ring-[#0B63CE]"
                />
                <span className="truncate">{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Slider */}
      <div className="border-b border-[#E9DFC9] pb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-gray-900">Max Price</h4>
          <span className="text-xs font-bold text-[#1F2937]">
            {maxPrice >= MAX_CATALOG_PRICE ? "Any Price" : inr(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max={MAX_CATALOG_PRICE}
          step="5000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-[#0B63CE] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>₹500</span>
          <span>₹25,00,000</span>
          <span>₹50,00,000</span>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="border-b border-[#E9DFC9] pb-4">
        <h4 className="font-bold text-gray-900 mb-2">Customer Rating</h4>
        <div className="space-y-1.5 text-xs">
          {[4, 3].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2 cursor-pointer hover:text-[#0B63CE]"
            >
              <input
                type="radio"
                name="ratingFilter"
                checked={minRating === stars}
                onChange={() => {
                  setMinRating(stars);
                  setCurrentPage(1);
                }}
                className="text-[#0B63CE] focus:ring-[#0B63CE]"
              />
              <span className="flex items-center gap-1 font-semibold text-[#388E3C]">
                {stars}★ & above
              </span>
            </label>
          ))}
          {minRating > 0 && (
            <button
              onClick={() => {
                setMinRating(0);
                setCurrentPage(1);
              }}
              className="text-[11px] text-[#0B63CE] hover:underline pt-1"
            >
              Clear rating filter
            </button>
          )}
        </div>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div className="border-b border-[#E9DFC9] pb-4">
          <h4 className="font-bold text-gray-900 mb-2">Brand</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((b) => (
              <label
                key={b}
                className="flex items-center gap-2 cursor-pointer text-xs hover:text-[#0B63CE]"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => handleBrandToggle(b)}
                  className="rounded border-gray-300 text-[#0B63CE] focus:ring-[#0B63CE]"
                />
                <span className="truncate">{b}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Discount */}
      <div className="border-b border-[#E9DFC9] pb-4">
        <h4 className="font-bold text-gray-900 mb-2">Discount</h4>
        <div className="space-y-1.5 text-xs">
          {[10, 20, 30, 50].map((d) => (
            <label
              key={d}
              className="flex items-center gap-2 cursor-pointer hover:text-[#0B63CE]"
            >
              <input
                type="radio"
                name="discountFilter"
                checked={minDiscount === d}
                onChange={() => {
                  setMinDiscount(d);
                  setCurrentPage(1);
                }}
                className="text-[#0B63CE] focus:ring-[#0B63CE]"
              />
              <span>{d}% off or more</span>
            </label>
          ))}
          {minDiscount > 0 && (
            <button
              onClick={() => {
                setMinDiscount(0);
                setCurrentPage(1);
              }}
              className="text-[11px] text-[#0B63CE] hover:underline pt-1"
            >
              Clear discount filter
            </button>
          )}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer text-xs hover:text-[#0B63CE]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="rounded border-gray-300 text-[#0B63CE] focus:ring-[#0B63CE]"
          />
          <span>Exclude Out of Stock</span>
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClearAllFilters}
          className="flex w-full items-center justify-center gap-1.5 rounded-[6px] border border-[#E9DFC9] bg-[#FAF5EB] py-2 text-xs font-bold text-[#DC2626] hover:bg-red-50 transition-colors"
        >
          <RotateCcw size={14} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF5EB] pb-16">
      {/* Header Banner */}
      <div className="border-b border-[#E9DFC9] bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#1F2937] sm:text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-1.5 rounded-[6px] border border-[#E9DFC9] bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-xs md:hidden"
              >
                <SlidersHorizontal size={14} /> Filters
                {hasActiveFilters && (
                  <span className="h-2 w-2 rounded-full bg-[#0B63CE]" />
                )}
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-[6px] border border-[#E9DFC9] bg-white px-3 py-2 text-xs font-bold text-gray-800 outline-none hover:border-gray-400 cursor-pointer shadow-xs"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6">
        <div className="flex gap-6">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-28 rounded-[8px] border border-[#E9DFC9] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9DFC9] mb-4">
                <h3 className="font-black text-sm uppercase tracking-wider text-gray-900 flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs font-semibold text-[#0B63CE] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {FilterContent}
            </div>
          </aside>

          {/* Main Grid Content Area */}
          <div className="flex-1 min-w-0">
            {/* Category Wide Banner if a specific category is selected */}
            {activeCategoryObj && (
              <div className="relative mb-6 overflow-hidden rounded-[8px] border border-[#E9DFC9] bg-[#131A2A] shadow-xs">
                <div className="relative h-36 sm:h-48 w-full overflow-hidden">
                  <img
                    src={`/images/categories/${activeCategoryObj.slug}/banner.webp`}
                    alt={activeCategoryObj.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex flex-col justify-center px-6 sm:px-10 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB020] mb-1">
                      Featured Department
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black">{activeCategoryObj.bannerTitle}</h2>
                    <p className="mt-1 text-xs text-gray-200 max-w-lg line-clamp-2">{activeCategoryObj.bannerSubtitle}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Applied:
                </span>
                {selectedSubcategories.map((sub) => (
                  <span
                    key={sub}
                    className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E9DFC9] px-2.5 py-1 text-xs font-medium text-gray-800 shadow-xs"
                  >
                    {sub}
                    <button
                      onClick={() => handleSubcategoryToggle(sub)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E9DFC9] px-2.5 py-1 text-xs font-medium text-gray-800 shadow-xs"
                  >
                    {b}
                    <button
                      onClick={() => handleBrandToggle(b)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E9DFC9] px-2.5 py-1 text-xs font-medium text-[#388E3C] shadow-xs">
                    {minRating}★ & above
                    <button
                      onClick={() => setMinRating(0)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {minDiscount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E9DFC9] px-2.5 py-1 text-xs font-medium text-[#16A34A] shadow-xs">
                    {minDiscount}%+ off
                    <button
                      onClick={() => setMinDiscount(0)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {maxPrice < MAX_CATALOG_PRICE && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E9DFC9] px-2.5 py-1 text-xs font-medium text-gray-800 shadow-xs">
                    Under {inr(maxPrice)}
                    <button
                      onClick={() => setMaxPrice(MAX_CATALOG_PRICE)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-bold text-[#DC2626] hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results count text */}
            <div className="mb-4 text-xs font-semibold text-[#6B7280]">
              Showing {sortedProducts.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0} -{" "}
              {Math.min(currentPage * PAGE_SIZE, sortedProducts.length)} of{" "}
              {sortedProducts.length} items
            </div>

            {/* Product Grid or Empty State */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[8px] border border-[#E9DFC9] bg-white p-12 text-center shadow-xs">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF5EB] text-gray-400 mb-3">
                  <Filter size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-xs text-gray-500 max-w-sm">
                  We couldn't find any products matching your selected filters. Try broadening your criteria or reset the filters.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="mt-4 rounded-[6px] bg-[#FFB020] px-4 py-2 text-xs font-bold text-gray-900 hover:bg-[#EAA015]"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="rounded-[6px] border border-[#E9DFC9] bg-white px-3 py-1.5 text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-[#FAF5EB]"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 7) return true;
                    return (
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - currentPage) <= 1
                    );
                  })
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && page - prev > 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-1 text-gray-400 text-xs">...</span>
                        )}
                        <button
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`min-w-[32px] rounded-[6px] px-2.5 py-1.5 text-xs font-bold transition-colors ${
                            currentPage === page
                              ? "bg-[#131A2A] text-white"
                              : "border border-[#E9DFC9] bg-white text-gray-800 hover:bg-[#FAF5EB]"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="rounded-[6px] border border-[#E9DFC9] bg-white px-3 py-1.5 text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-[#FAF5EB]"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-4/5 max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Filter size={18} /> Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{FilterContent}</div>
            <div className="border-t border-gray-200 p-4 flex gap-2">
              <button
                onClick={() => {
                  handleClearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 rounded-[6px] border border-gray-300 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 rounded-[6px] bg-[#131A2A] py-2 text-xs font-bold text-white hover:bg-black"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
