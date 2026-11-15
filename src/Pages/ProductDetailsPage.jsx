
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { ShopContext } from "./ShopContext";

export const ProductDetailsPage = () => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const { dispatch } = useContext(ShopContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      setProduct(null);
      setError("");
      setCount(1);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong while loading this product.");
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#101412] px-5">
        <p className="text-center text-[#E16B6B]">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#101412]">
        <p className="animate-pulse text-sm text-[#A5AEA8]">
          Loading product...
        </p>
      </div>
    );
  }

  const inStock = product.stock > 0;

  const handleCart = () => {
    if (!inStock) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: count,
      },
    });
  };

  const handleWishlist = () => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: product,
    });
  };

  const handleBuyNow = () => {
    if (!inStock) return;

    handleCart();
    navigate("/checkout");
  };

  const originalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <main className="min-h-screen bg-[#101412] px-4 py-8 text-[#F4F6F4] md:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#A5AEA8]">
          <Link to="/" className="hover:text-[#3D9B79]">
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="capitalize">{product.category}</span>

          <ChevronRight size={14} />

          <span className="max-w-[220px] truncate text-[#F4F6F4] sm:max-w-sm">
            {product.title}
          </span>
        </nav>

        {/* Main Product Card */}
        <div className="grid overflow-hidden rounded-2xl border border-[#303A34] bg-[#191F1C] md:grid-cols-2">

          {/* Product Image */}
          <div className="relative flex min-h-[350px] items-center justify-center bg-[#E9EEEA] p-8 md:min-h-[550px] md:p-12">

            {product.discountPercentage > 0 && (
              <span className="absolute left-5 top-5 rounded-full bg-[#1E3A2F] px-4 py-2 text-xs font-semibold text-[#3D9B79]">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}

            <button
              type="button"
              onClick={handleWishlist}
              aria-label="Add to wishlist"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#303A34] bg-[#191F1C] text-[#F4F6F4] transition hover:border-[#3D9B79] hover:text-[#3D9B79]"
            >
              <Heart size={21} />
            </button>

            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-[300px] w-full max-w-[500px] object-contain transition-transform duration-500 hover:scale-105 md:h-[430px]"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center p-6 md:p-9 lg:p-11">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              {product.category}
            </p>

            <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm text-amber-400">★★★★★</span>

              <span className="text-sm font-semibold">
                {product.rating}
              </span>

              <span className="text-xs text-[#A5AEA8]">
                Customer rating
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold text-[#3D9B79]">
                ${product.price}
              </span>

              {originalPrice && (
                <span className="pb-1 text-sm text-[#A5AEA8] line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#A5AEA8]">
              {product.description}
            </p>

            <div className="my-7 h-px bg-[#303A34]" />

            {/* Quantity */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">Quantity</p>

                <span
                  className={`text-xs ${
                    inStock ? "text-[#65C9A3]" : "text-[#E16B6B]"
                  }`}
                >
                  {inStock
                    ? `${product.stock} available`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-[#303A34] bg-[#141916]">
                <button
                  type="button"
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                  disabled={count <= 1 || !inStock}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center transition hover:bg-[#26332D] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-[#303A34] text-sm font-semibold">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCount((prev) => Math.min(product.stock, prev + 1))
                  }
                  disabled={!inStock || count >= product.stock}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center transition hover:bg-[#26332D] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  handleCart();
                  navigate("/cart");
                }}
                disabled={!inStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#3D9B79] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#328568] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Add to wishlist"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#303A34] transition hover:border-[#3D9B79] hover:text-[#3D9B79]"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!inStock}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#3D9B79] bg-[#1E3A2F] px-5 py-3 text-sm font-semibold text-[#65C9A3] transition hover:bg-[#263F33] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Zap size={18} />
              Buy Now
            </button>

            {/* Delivery and Availability */}
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#303A34] pt-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[#3D9B79]">
                  <Truck size={17} />
                  <span className="text-xs font-semibold">Delivery</span>
                </div>

                <p className="text-sm font-medium">
                  Calculated at checkout
                </p>

                <p className="mt-1 text-xs text-[#A5AEA8]">
                  Based on your order
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-[#3D9B79]">
                  <ShieldCheck size={17} />
                  <span className="text-xs font-semibold">Availability</span>
                </div>

                <p className={inStock
                  ? "text-sm font-medium text-[#65C9A3]"
                  : "text-sm font-medium text-[#E16B6B]"
                }>
                  {inStock ? "In Stock" : "Out of Stock"}
                </p>

                <p className="mt-1 text-xs text-[#A5AEA8]">
                  {inStock ? `${product.stock} units listed` : "Currently unavailable"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Product Information */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Brand",
              value: product.brand || "Not specified",
            },
            {
              label: "Warranty",
              value: product.warrantyInformation || "Not specified",
            },
            {
              label: "Returns",
              value: product.returnPolicy || "Not specified",
            },
          ].map((detail) => (
            <div
              key={detail.label}
              className="rounded-xl border border-[#303A34] bg-[#191F1C] p-6"
            >
              <p className="text-xs uppercase tracking-wider text-[#A5AEA8]">
                {detail.label}
              </p>

              <p className="mt-3 text-sm font-semibold text-[#F4F6F4]">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
