import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  MapPin,
  Search,
  ShoppingCart,
  Heart,
  Package,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, searchProducts, type Product } from "../data/products";
import { inr, useStore } from "../lib/store";
import { ProductImage } from "./ProductImage";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const savedAddress = useStore((s) => s.savedAddress);

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Debounced search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      const results = searchProducts(searchQuery, selectedCategory).slice(0, 7);
      setSuggestions(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Click outside listener for suggestions and account menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate({
      to: "/search",
      search: {
        q: searchQuery.trim(),
        cat: selectedCategory !== "all" ? selectedCategory : undefined,
      },
    });
  };

  const handleSelectSuggestion = (product: Product) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate({
      to: "/product/$id",
      params: { id: product.id },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Main Navy Header */}
      <div className="bg-[#131A2A] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6">
          {/* Left section: Hamburger (mobile) + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded p-1 text-gray-300 hover:bg-[#1F2A44] hover:text-white md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="flex items-center gap-1.5 focus:outline-none">
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                Kart<span className="text-[#FFB020]">Nest</span>
              </span>
              <span className="hidden text-[10px] uppercase font-bold tracking-widest text-[#FFB020] sm:inline-block border border-[#FFB020]/40 rounded px-1 py-0.2">
                PLUS
              </span>
            </Link>

            {/* Delivery Location Chip */}
            <div className="hidden lg:flex items-center gap-1.5 pl-3 text-xs text-gray-300 hover:text-white cursor-pointer transition-colors border-l border-gray-700">
              <MapPin size={16} className="text-[#FFB020] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-400">Deliver to</span>
                <span className="font-semibold text-white truncate max-w-[130px]">
                  {savedAddress.city} {savedAddress.pincode}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar with Category Dropdown & Live Suggestions */}
          <div
            ref={searchContainerRef}
            className="relative hidden flex-1 max-w-2xl md:block"
          >
            <form onSubmit={handleSearchSubmit} className="flex h-10 w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-full rounded-l-[6px] border-r border-gray-300 bg-gray-100 px-2.5 text-xs font-medium text-gray-700 outline-none hover:bg-gray-200 cursor-pointer max-w-[130px]"
              >
                <option value="all">All Categories ({PRODUCTS.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={`Search over ${PRODUCTS.length.toLocaleString("en-IN")} products, brands, electronics, fashion...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="h-full w-full bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="flex h-full items-center justify-center rounded-r-[6px] bg-[#FFB020] px-4 text-[#131A2A] hover:bg-[#EAA015] transition-colors"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
            </form>

            {/* Live debounced suggestions popup */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto rounded-md border border-[#E9DFC9] bg-white shadow-xl z-50">
                <div className="p-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Search Suggestions
                </div>
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectSuggestion(p)}
                    className="flex items-center gap-3 p-2.5 hover:bg-[#FAF5EB] cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="h-10 w-10 shrink-0">
                      <ProductImage
                        src={p.images[0]}
                        alt={p.name}
                        categoryName={p.category}
                        categorySlug={p.categorySlug}
                        className="h-full w-full object-contain rounded bg-white border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-900 truncate">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-2">
                        <span>{p.category}</span>
                        <span>•</span>
                        <span className="font-bold text-[#1F2937]">{inr(p.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={handleSearchSubmit}
                  className="p-2 text-center text-xs font-bold text-[#0B63CE] bg-gray-50 hover:bg-gray-100 cursor-pointer"
                >
                  View all matching products for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Right section: Account, Orders, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-5 text-sm">
            {/* Account Menu */}
            <div ref={accountMenuRef} className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1 text-left text-gray-200 hover:text-white transition-colors"
              >
                <UserIcon size={18} className="text-[#FFB020]" />
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-300">
                    Hello, {user ? user.name.split(" ")[0] : "Sign in"}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-0.5">
                    Account <ChevronDown size={12} />
                  </span>
                </div>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-[8px] border border-[#E9DFC9] bg-white p-2 text-gray-800 shadow-xl z-50">
                  {user ? (
                    <div className="border-b border-gray-100 pb-2 mb-2 px-2">
                      <p className="text-xs font-bold text-gray-900">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>
                  ) : (
                    <div className="border-b border-gray-100 pb-2 mb-2 px-2">
                      <Link
                        to="/login"
                        onClick={() => setAccountMenuOpen(false)}
                        className="block w-full rounded bg-[#FFB020] py-1.5 text-center text-xs font-bold text-gray-900 hover:bg-[#EAA015]"
                      >
                        Sign In
                      </Link>
                      <p className="mt-1.5 text-center text-[11px] text-gray-500">
                        New customer?{" "}
                        <Link
                          to="/signup"
                          onClick={() => setAccountMenuOpen(false)}
                          className="font-bold text-[#0B63CE] hover:underline"
                        >
                          Start here
                        </Link>
                      </p>
                    </div>
                  )}

                  <Link
                    to="/account"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-gray-700 hover:bg-[#FAF5EB]"
                  >
                    <UserIcon size={14} /> My Profile & Address
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-gray-700 hover:bg-[#FAF5EB]"
                  >
                    <Package size={14} /> My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-gray-700 hover:bg-[#FAF5EB]"
                  >
                    <Heart size={14} /> Wishlist ({wishlist.length})
                  </Link>

                  {user && (
                    <div className="border-t border-gray-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs font-semibold text-[#DC2626] hover:bg-red-50"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Orders link */}
            <Link
              to="/orders"
              className="hidden md:flex flex-col leading-tight text-gray-200 hover:text-white"
            >
              <span className="text-[10px] text-gray-400">Returns</span>
              <span className="text-xs font-bold">& Orders</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1 text-gray-200 hover:text-white"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-medium ml-1">Wishlist</span>
            </Link>

            {/* Cart Link with live badge */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-gray-200 hover:text-white hover:bg-[#1F2A44] transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-[#FFB020]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-[#F97316] px-1 text-[11px] font-black text-white shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="px-3 pb-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex h-9 w-full">
            <input
              type="text"
              placeholder={`Search ${PRODUCTS.length.toLocaleString("en-IN")}+ products...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full flex-1 rounded-l-[6px] bg-white px-3 text-xs text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="flex h-full items-center justify-center rounded-r-[6px] bg-[#FFB020] px-3.5 text-[#131A2A]"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Sub-header Strip: All 12 Categories */}
      <div className="bg-[#1F2A44] text-gray-200 text-xs font-medium shadow-inner overflow-x-auto no-scrollbar">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-3 py-2 sm:px-6 whitespace-nowrap">
          <Link
            to="/products"
            className="flex items-center gap-1.5 hover:text-[#FFB020] transition-colors font-bold text-white shrink-0"
          >
            <Sparkles size={14} className="text-[#FFB020]" /> All Products
          </Link>

          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="flex items-center gap-1.5 hover:text-[#FFB020] transition-colors shrink-0 text-gray-300 hover:text-white"
            >
              <img
                src={cat.navIcon}
                alt=""
                className="h-3.5 w-3.5 invert opacity-75"
                aria-hidden="true"
              />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-white text-gray-900 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between bg-[#131A2A] p-4 text-white">
              <div className="flex items-center gap-2">
                <UserIcon size={20} className="text-[#FFB020]" />
                <div>
                  <div className="text-xs text-gray-300">Hello,</div>
                  <div className="text-sm font-bold">
                    {user ? user.name : "Sign in / Register"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!user ? (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded bg-[#FFB020] py-2 text-center text-xs font-bold text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded border border-[#131A2A] py-2 text-center text-xs font-bold text-[#131A2A]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-1 border-b border-gray-200 pb-3">
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm font-medium text-gray-700"
                  >
                    My Account & Address
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm font-medium text-gray-700"
                  >
                    Orders & Tracking
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm font-medium text-gray-700"
                  >
                    Wishlist ({wishlist.length})
                  </Link>
                </div>
              )}

              {/* Categories */}
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Shop by Category
                </div>
                <div className="space-y-1">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded px-2 py-1.5 text-sm font-bold text-[#0B63CE] hover:bg-[#FAF5EB]"
                  >
                    All {PRODUCTS.length.toLocaleString("en-IN")} Products
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to="/category/$slug"
                      params={{ slug: cat.slug }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-[#FAF5EB]"
                    >
                      <img src={cat.navIcon} alt="" className="h-4 w-4 opacity-70" aria-hidden="true" />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {user && (
                <div className="border-t border-gray-200 pt-3">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 text-sm font-semibold text-red-600"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
