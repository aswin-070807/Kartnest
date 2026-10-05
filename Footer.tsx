import React from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, RefreshCcw, Headset, ArrowUp } from "lucide-react";
import { CATEGORIES } from "../data/products";

export const TrustStrip: React.FC = () => {
  return (
    <div className="bg-white border-y border-[#E9DFC9] py-6 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF5EB] border border-[#E9DFC9] text-[#131A2A]">
              <Truck size={22} className="text-[#FFB020]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Express Delivery</h4>
              <p className="text-[11px] text-gray-500">On all orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF5EB] border border-[#E9DFC9] text-[#131A2A]">
              <RefreshCcw size={20} className="text-[#FFB020]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">7-Day Free Returns</h4>
              <p className="text-[11px] text-gray-500">Hassle-free instant refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF5EB] border border-[#E9DFC9] text-[#131A2A]">
              <ShieldCheck size={22} className="text-[#FFB020]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Secure Demo Payments</h4>
              <p className="text-[11px] text-gray-500">100% safe & encrypted sandbox</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF5EB] border border-[#E9DFC9] text-[#131A2A]">
              <Headset size={22} className="text-[#FFB020]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">24x7 Customer Help</h4>
              <p className="text-[11px] text-gray-500">Dedicated round-the-clock team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-[#E9DFC9] bg-[#131A2A] text-gray-300">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="flex w-full items-center justify-center gap-2 bg-[#1F2A44] py-3 text-xs font-bold text-gray-200 hover:bg-[#28375A] transition-colors"
      >
        <ArrowUp size={16} /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Get to Know Us
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  About KartNest
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Careers & Culture
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Press Releases
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  KartNest Science & Innovation
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Twitter / X
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Instagram
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  YouTube Showcase
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  LinkedIn Community
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Make Money With Us
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Sell on KartNest
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Protect and Build Your Brand
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Become an Affiliate
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Fulfilment by KartNest
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Let Us Help You
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Returns & Order Tracker
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Checkout & Payment Assistant
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  KartNest App Download
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories Directory */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="mb-2 text-xs font-semibold text-gray-400">
            Popular Categories:
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="hover:text-white transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-400 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>Conditions of Use & Sale</span>
            <span>Privacy Notice</span>
            <span>Interest-Based Ads</span>
            <span>Security Center</span>
          </div>
          <p className="text-[11px] text-gray-400">
            © 2026, KartNest.com, Inc. or its demo affiliates. This is a demonstration e-commerce platform. All product data and images are powered by DummyJSON.
          </p>
        </div>
      </div>
    </footer>
  );
};
