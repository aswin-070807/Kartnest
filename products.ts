import baseProductsRaw from "./base-products.json";
import imageManifestRaw from "./image-manifest.json";

const imageManifest = imageManifestRaw as Record<
  string,
  {
    id: string;
    name: string;
    brand: string;
    category: string;
    categorySlug: string;
    subcategory: string;
    image: string;
    gallery: string[];
    alt: string;
    source: string;
  }
>;

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductOptions {
  colors?: string[];
  sizes?: string[];
  storage?: string[];
  pack?: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  description: string;
  highlights: [string, string, string, string];
  specs: Record<string, string>;
  options: ProductOptions;
  images: string[];
  alt?: string;
  sourceCredit?: string;
  flags: {
    bestseller: boolean;
    new: boolean;
    deal: boolean;
  };
}

export interface CategoryInfo {
  name: string;
  slug: string;
  subcategories: string[];
  image: string;
  thumbnail: string;
  banner: string;
  navIcon: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Mobiles and Accessories",
    slug: "mobiles-accessories",
    subcategories: ["Smartphones", "Cases & Covers", "Cables & Fast Chargers", "Power Banks & Audio", "Tablets"],
    image: "/images/categories/mobiles-accessories/thumbnail.webp",
    thumbnail: "/images/categories/mobiles-accessories/thumbnail.webp",
    banner: "/images/categories/mobiles-accessories/banner.webp",
    navIcon: "/images/categories/mobiles-accessories/icon.svg",
    bannerTitle: "Latest Mobile Tech & Accessories",
    bannerSubtitle: "Grab up to 40% off on flagship smartphones and mobile essentials",
  },
  {
    name: "Laptops and Computers",
    slug: "laptops-computers",
    subcategories: ["Thin & Light Laptops", "Gaming Laptops", "Ultrabooks", "Peripherals & Keyboards"],
    image: "/images/categories/laptops-computers/thumbnail.webp",
    thumbnail: "/images/categories/laptops-computers/thumbnail.webp",
    banner: "/images/categories/laptops-computers/banner.webp",
    navIcon: "/images/categories/laptops-computers/icon.svg",
    bannerTitle: "Performance Laptops & Workstations",
    bannerSubtitle: "High-speed processors and high-res displays for creators & gamers",
  },
  {
    name: "Electronics and Gadgets",
    slug: "electronics-gadgets",
    subcategories: ["Smartwatches", "Audio & Wearables", "Eyewear & Sunglasses", "Fitness Trackers"],
    image: "/images/categories/electronics-gadgets/thumbnail.webp",
    thumbnail: "/images/categories/electronics-gadgets/thumbnail.webp",
    banner: "/images/categories/electronics-gadgets/banner.webp",
    navIcon: "/images/categories/electronics-gadgets/icon.svg",
    bannerTitle: "Smart Gear & Trendsetting Gadgets",
    bannerSubtitle: "Wearable intelligence, precision optics and audio innovation",
  },
  {
    name: "Men's Fashion",
    slug: "mens-fashion",
    subcategories: ["Casual Shirts", "Sneakers & Loafers", "Formal Wear", "Analog Watches", "Activewear"],
    image: "/images/categories/mens-fashion/thumbnail.webp",
    thumbnail: "/images/categories/mens-fashion/thumbnail.webp",
    banner: "/images/categories/mens-fashion/banner.webp",
    navIcon: "/images/categories/mens-fashion/icon.svg",
    bannerTitle: "Sharp & Contemporary Men's Wardrobe",
    bannerSubtitle: "Crisp cottons, tailored fits and statement footwear",
  },
  {
    name: "Women's Fashion",
    slug: "womens-fashion",
    subcategories: ["Dresses & Tops", "Handbags & Totes", "Heels & Flats", "Fine Jewellery", "Designer Watches"],
    image: "/images/categories/womens-fashion/thumbnail.webp",
    thumbnail: "/images/categories/womens-fashion/thumbnail.webp",
    banner: "/images/categories/womens-fashion/banner.webp",
    navIcon: "/images/categories/womens-fashion/icon.svg",
    bannerTitle: "Effortless Elegance for Every Occasion",
    bannerSubtitle: "Chic ensembles, artisanal bags and timeless jewellery",
  },
  {
    name: "Home and Kitchen",
    slug: "home-kitchen",
    subcategories: ["Cookware & Pans", "Kitchen Cutlery", "Storage & Jars", "Coffee & Tea Makers", "Serveware"],
    image: "/images/categories/home-kitchen/thumbnail.webp",
    thumbnail: "/images/categories/home-kitchen/thumbnail.webp",
    banner: "/images/categories/home-kitchen/banner.webp",
    navIcon: "/images/categories/home-kitchen/icon.svg",
    bannerTitle: "Culinary & Kitchen Upgrades",
    bannerSubtitle: "Premium non-stick cookware and ergonomic kitchen essentials",
  },
  {
    name: "Furniture and Decor",
    slug: "furniture-decor",
    subcategories: ["Accent Chairs & Sofas", "Wall Art & Frames", "Table Lamps", "Vases & Figurines", "Office Desks"],
    image: "/images/categories/furniture-decor/thumbnail.webp",
    thumbnail: "/images/categories/furniture-decor/thumbnail.webp",
    banner: "/images/categories/furniture-decor/banner.webp",
    navIcon: "/images/categories/furniture-decor/icon.svg",
    bannerTitle: "Living Space & Ambient Decor",
    bannerSubtitle: "Modern minimalist craftsmanship to elevate your home",
  },
  {
    name: "Beauty and Personal Care",
    slug: "beauty-personal-care",
    subcategories: ["Skincare Serums", "Luxury Fragrances", "Lipsticks & Eyes", "Moisturisers & Sunscreen"],
    image: "/images/categories/beauty-personal-care/thumbnail.webp",
    thumbnail: "/images/categories/beauty-personal-care/thumbnail.webp",
    banner: "/images/categories/beauty-personal-care/banner.webp",
    navIcon: "/images/categories/beauty-personal-care/icon.svg",
    bannerTitle: "Radiant Skincare & Luxury Scents",
    bannerSubtitle: "Dermatologically tested formulas and exquisite perfumes",
  },
  {
    name: "Sports and Fitness",
    slug: "sports-fitness",
    subcategories: ["Dumbbells & Weights", "Yoga Mats & Bands", "Running Gear", "Outdoor Equipment"],
    image: "/images/categories/sports-fitness/thumbnail.webp",
    thumbnail: "/images/categories/sports-fitness/thumbnail.webp",
    banner: "/images/categories/sports-fitness/banner.webp",
    navIcon: "/images/categories/sports-fitness/icon.svg",
    bannerTitle: "Peak Performance & Everyday Fitness",
    bannerSubtitle: "Durable gym equipment and active training accessories",
  },
  {
    name: "Grocery",
    slug: "grocery",
    subcategories: ["Gourmet Spices & Oils", "Beverages & Coffee", "Nuts & Dry Fruits", "Healthy Breakfast"],
    image: "/images/categories/grocery/thumbnail.webp",
    thumbnail: "/images/categories/grocery/thumbnail.webp",
    banner: "/images/categories/grocery/banner.webp",
    navIcon: "/images/categories/grocery/icon.svg",
    bannerTitle: "Fresh Farm Staples & Gourmet Pantry",
    bannerSubtitle: "Organic harvest, whole dry fruits and daily kitchen staples",
  },
  {
    name: "Vehicles and Motorcycles",
    slug: "vehicles-motorcycles",
    subcategories: ["Riding Jackets & Gloves", "Helmets & Visors", "Car Polish & Cleaners", "Emergency Toolkits"],
    image: "/images/categories/vehicles-motorcycles/thumbnail.webp",
    thumbnail: "/images/categories/vehicles-motorcycles/thumbnail.webp",
    banner: "/images/categories/vehicles-motorcycles/banner.webp",
    navIcon: "/images/categories/vehicles-motorcycles/icon.svg",
    bannerTitle: "Rider Essentials & Auto Care",
    bannerSubtitle: "Certified protective helmets and precision maintenance supplies",
  },
  {
    name: "Kids and Toys",
    slug: "kids-toys",
    subcategories: ["Educational Toys", "Building Blocks & Puzzles", "Board Games & Play", "Soft Toys & Dolls"],
    image: "/images/categories/kids-toys/thumbnail.webp",
    thumbnail: "/images/categories/kids-toys/thumbnail.webp",
    banner: "/images/categories/kids-toys/banner.webp",
    navIcon: "/images/categories/kids-toys/icon.svg",
    bannerTitle: "Creative Play & Kids Adventures",
    bannerSubtitle: "STEM learning kits, colourful building sets and fun board games",
  },
];

interface RawProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  images: string[];
  thumbnail: string;
}

function roundToRealisticInr(rawInr: number): number {
  if (rawInr < 300) {
    return Math.max(99, Math.round(rawInr / 10) * 10 - 1);
  }
  if (rawInr < 1000) {
    return Math.round(rawInr / 50) * 50 - 1;
  }
  return Math.round(rawInr / 100) * 100 - 1;
}

const VARIANT_MODIFIERS = [
  { prefix: "Pro Edition", suffix: "(Midnight Black)", priceMul: 1.08, optColor: "Midnight Black", optSize: "L", optStorage: "256GB" },
  { prefix: "Max", suffix: "(Space Grey)", priceMul: 1.22, optColor: "Space Grey", optSize: "XL", optStorage: "512GB" },
  { prefix: "Plus Pack", suffix: "(Navy Blue)", priceMul: 0.94, optColor: "Navy Blue", optSize: "M", optStorage: "128GB" },
  { prefix: "Special Edition", suffix: "(Emerald Green)", priceMul: 1.15, optColor: "Emerald Green", optSize: "S", optStorage: "256GB" },
  { prefix: "Signature Series", suffix: "(Sunset Gold)", priceMul: 1.30, optColor: "Sunset Gold", optSize: "XXL", optStorage: "1TB" },
  { prefix: "Essential", suffix: "(Arctic White)", priceMul: 0.88, optColor: "Arctic White", optSize: "M", optStorage: "64GB" },
];

function buildProducts(): Product[] {
  const baseList = baseProductsRaw as RawProduct[];
  const result: Product[] = [];

  baseList.forEach((base, baseIdx) => {
    const baseInr = Math.max(120, roundToRealisticInr(base.price * 83));
    const baseDiscount = Math.min(65, Math.max(12, Math.round(base.discountPercentage || 22)));
    const baseMrp = roundToRealisticInr(baseInr / (1 - baseDiscount / 100));
    const baseRating = Number((3.7 + (baseIdx % 13) * 0.09).toFixed(1));
    const baseReviews = 80 + ((baseIdx * 97) % 3400);

    const baseProdId = `prod-${base.id}`;
    const manifestEntry = imageManifest[baseProdId];

    const category = manifestEntry?.category || "Home and Kitchen";
    const categorySlug = manifestEntry?.categorySlug || "home-kitchen";
    const subcategory = manifestEntry?.subcategory || "Cookware & Pans";
    const brandName = base.brand || manifestEntry?.brand || "KartNest Choice";

    const baseImages = manifestEntry?.gallery && manifestEntry.gallery.length > 0
      ? manifestEntry.gallery
      : manifestEntry?.image
      ? [manifestEntry.image]
      : [base.thumbnail];

    const highlights: [string, string, string, string] = [
      `Genuine ${brandName} engineering with factory quality assurance`,
      "100% authentic product certified with 7-day hassle-free replacement",
      "Free express delivery across 20,000+ Indian pincodes",
      "Pay with UPI, Cards, Net Banking or Cash on Delivery",
    ];

    const specs: Record<string, string> = {
      Brand: brandName,
      Category: category,
      Subcategory: subcategory,
      Model: `${brandName} ${base.title.split(" ").slice(0, 2).join(" ")}`,
      Warranty: "1 Year Domestic Manufacturer Warranty",
      "In The Box": "Product Unit, Quick User Manual, Warranty Card, Accessories",
      "Country of Origin": "India / Global Sourced",
    };

    // Base product #1
    result.push({
      id: baseProdId,
      name: manifestEntry?.name || base.title,
      brand: brandName,
      category,
      categorySlug,
      subcategory,
      price: baseInr,
      mrp: Math.max(baseMrp, baseInr + 300),
      discount: baseDiscount,
      rating: Math.min(4.9, Math.max(3.6, baseRating)),
      reviewsCount: baseReviews,
      stock: Math.max(12, base.stock || 45),
      description: base.description || `${base.title} offers top-tier reliability, ergonomic design and superior value for daily use.`,
      highlights,
      specs,
      options: {
        colors: ["Midnight Black", "Navy Blue", "Arctic White", "Space Grey"],
        sizes: ["S", "M", "L", "XL"],
        storage: ["128GB", "256GB", "512GB"],
        pack: ["Pack of 1", "Pack of 2", "Pack of 4"],
      },
      images: baseImages,
      alt: manifestEntry?.alt || `${brandName} ${base.title}`,
      sourceCredit: manifestEntry?.source || "KartNest Verified",
      flags: {
        bestseller: baseIdx % 4 === 0,
        new: baseIdx % 5 === 1,
        deal: baseIdx % 3 === 0,
      },
    });

    // 6 Variants per base product => 194 * 7 = 1,358 products
    VARIANT_MODIFIERS.forEach((mod, vIdx) => {
      const vProdId = `prod-${base.id}-v${vIdx + 1}`;
      const vManifest = imageManifest[vProdId];

      const vPrice = roundToRealisticInr(baseInr * mod.priceMul);
      const vDiscount = Math.min(68, Math.max(15, Math.round(baseDiscount + ((vIdx % 3) - 1) * 6)));
      const vMrp = roundToRealisticInr(vPrice / (1 - vDiscount / 100));
      const vRating = Number(Math.min(4.9, Math.max(3.6, 3.8 + ((baseIdx + vIdx) % 11) * 0.1)).toFixed(1));
      const vReviews = 40 + ((baseIdx * 43 + vIdx * 89) % 2100);

      const vCat = vManifest?.category || category;
      const vCatSlug = vManifest?.categorySlug || categorySlug;
      const vSub = vManifest?.subcategory || subcategory;
      const vName = vManifest?.name || `${mod.prefix} ${base.title} ${mod.suffix}`;

      const vImages = vManifest?.gallery && vManifest.gallery.length > 0
        ? vManifest.gallery
        : vManifest?.image
        ? [vManifest.image]
        : baseImages;

      result.push({
        id: vProdId,
        name: vName,
        brand: brandName,
        category: vCat,
        categorySlug: vCatSlug,
        subcategory: vSub,
        price: vPrice,
        mrp: Math.max(vMrp, vPrice + 250),
        discount: vDiscount,
        rating: vRating,
        reviewsCount: vReviews,
        stock: 15 + ((baseIdx * 7 + vIdx * 11) % 65),
        description: `Premium ${mod.prefix} edition of ${base.title}. ${base.description} Featuring custom ${mod.optColor} finish and reinforced build quality.`,
        highlights: [
          `Special edition ${mod.prefix} styling with enhanced durability`,
          `Includes genuine ${brandName} accessories and protective casing`,
          "Fast fulfillment with priority dispatch within 24 hours",
          "Comprehensive warranty with dedicated customer support",
        ],
        specs: {
          ...specs,
          Model: `${brandName} ${mod.prefix} ${base.title.split(" ").slice(0, 2).join(" ")}`,
          "Color Variant": mod.optColor,
          Configuration: mod.optStorage,
        },
        options: {
          colors: [mod.optColor, "Midnight Black", "Arctic White", "Space Grey"].filter((v, i, a) => a.indexOf(v) === i),
          sizes: ["S", "M", "L", "XL", "XXL"],
          storage: ["128GB", "256GB", "512GB", "1TB"],
          pack: ["Pack of 1", "Pack of 2", "Pack of 4"],
        },
        images: vImages,
        alt: vManifest?.alt || `${brandName} ${vName}`,
        sourceCredit: vManifest?.source || "KartNest Verified Variant",
        flags: {
          bestseller: (baseIdx + vIdx) % 5 === 0,
          new: (baseIdx + vIdx) % 6 === 2,
          deal: (baseIdx + vIdx) % 4 === 1,
        },
      });
    });
  });

  return result;
}

export const PRODUCTS: Product[] = buildProducts();

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedDeals(limit = 10): Product[] {
  return PRODUCTS.filter((p) => p.flags.deal).slice(0, limit);
}

export function getBestsellers(limit = 10): Product[] {
  return PRODUCTS.filter((p) => p.flags.bestseller).slice(0, limit);
}

export function getNewArrivals(limit = 10): Product[] {
  return PRODUCTS.filter((p) => p.flags.new).slice(0, limit);
}

export function getTopPicks(limit = 10): Product[] {
  return PRODUCTS.filter((p) => p.rating >= 4.5).slice(0, limit);
}

export function getSimilarProducts(product: Product, limit = 8): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.brand === product.brand)
  ).slice(0, limit);
}

export function searchProducts(query: string, categorySlug?: string, subcategory?: string): Product[] {
  const q = query.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (categorySlug && categorySlug !== "all" && p.categorySlug !== categorySlug) {
      return false;
    }
    if (subcategory && p.subcategory !== subcategory) {
      return false;
    }
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });
}
