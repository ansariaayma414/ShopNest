import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";

export const ProductDetailsPage = () => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);

  const { dispatch } = useContext(ShopContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);

      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDF8F4]">
        <p className="text-sm text-gray-500">Loading product...</p>
      </div>
    );
  }

  const handleCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: count,
      },
    });
  };

  const wishlist = () => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: product,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4] px-5 py-7 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
          <span>Home</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="max-w-[250px] truncate text-[#1C211F]">
            {product.title}
          </span>
        </div>

        {/* Main Product Card */}
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-2">
          {/* ================= IMAGE SECTION ================= */}
          <div className="relative flex min-h-[420px] items-center justify-center bg-[#F5F0EB] p-8 md:min-h-[560px] md:p-10">
            {/* Discount Badge */}
            {product.discountPercentage && (
              <div className="absolute left-5 top-5 z-10 rounded-full bg-[#1C211F] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-white">
                -{Math.round(product.discountPercentage)}% OFF
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={wishlist}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-lg text-[#1C211F] shadow-sm transition hover:scale-105 hover:bg-gray-50"
            >
              ♡
            </button>

            {/* Product Image */}
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-[330px] w-full max-w-[500px] object-contain transition duration-500 hover:scale-105 md:h-[440px]"
              />
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="flex flex-col justify-center p-6 md:p-9 lg:p-11">
            {/* Category */}
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7C5CFF]">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-[#1C211F] md:text-3xl lg:text-[38px]">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2.5">
              <div className="flex items-center gap-0.5 text-sm text-[#7C5CFF]">
                ★★★★★
              </div>

              <span className="text-sm font-medium text-[#1C211F]">
                {product.rating}
              </span>

              <span className="text-xs text-gray-400">· Customer reviews</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end gap-3">
              <span className="text-2xl font-semibold text-[#1C211F]">
                ${product.price}
              </span>

              {product.discountPercentage && (
                <span className="pb-0.5 text-sm text-gray-400 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* Quantity */}
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1C211F]">Quantity</p>

                <span className="text-[11px] text-gray-400">
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                <button
                  onClick={() => setCount(Math.max(1, count - 1))}
                  className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50"
                >
                  −
                </button>

                <span className="flex h-10 w-11 items-center justify-center border-x border-gray-200 text-sm font-semibold text-[#1C211F]">
                  {count}
                </span>

                <button
                  onClick={() => setCount(count + 1)}
                  className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              {/* Add To Cart */}
              <Link to="/cart">
                <button
                  onClick={handleCart}
                  disabled={product.stock === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1C211F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#303532] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add to Cart
                  <span className="text-sm">🛒</span>
                </button>
              </Link>

              {/* Wishlist */}
              <button
                onClick={wishlist}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-gray-200 text-lg text-[#1C211F] transition hover:bg-gray-50"
              >
                ♡
              </button>
            </div>

            {/* Buy Now */}
            <button
              disabled={product.stock === 0}
              className="mt-2.5 w-full rounded-lg bg-[#7C5CFF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </button>

            {/* Product Details */}
            <div className="mt-6 grid grid-cols-2 gap-5 border-t border-gray-200 pt-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Delivery
                </p>

                <p className="mt-1.5 text-xs font-semibold text-[#1C211F]">
                  Free Delivery
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  Available at checkout
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Availability
                </p>

                <p
                  className={`mt-1.5 text-xs font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= EXTRA PRODUCT INFO ================= */}
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-3">
          <div className="bg-white p-5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              Brand
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#1C211F]">
              {product.brand || "ShopNest"}
            </p>
          </div>

          <div className="bg-white p-5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              Warranty
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#1C211F]">
              {product.warrantyInformation || "1 Year Warranty"}
            </p>
          </div>

          <div className="bg-white p-5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              Returns
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#1C211F]">
              {product.returnPolicy || "7 Days Return"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
