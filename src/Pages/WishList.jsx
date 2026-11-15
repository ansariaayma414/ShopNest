
import { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Star,
} from "lucide-react";

const Wishlist = () => {
  const { state, dispatch } = useContext(ShopContext);

  const removeWishlist = (id) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
  };

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: 1,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#101412] px-4 py-10 text-[#F4F6F4] sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 border-b border-[#303A34] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              Your Collection
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Wishlist
            </h1>

            <p className="mt-3 text-sm text-[#A5AEA8]">
              Products you love, saved for later.
            </p>
          </div>

          {state.wishlist.length > 0 && (
            <div className="w-fit rounded-full border border-[#303A34] bg-[#191F1C] px-4 py-2 text-sm font-medium text-[#A5AEA8]">
              {state.wishlist.length}{" "}
              {state.wishlist.length === 1 ? "item" : "items"}
            </div>
          )}
        </div>

        {/* Wishlist Products */}
        {state.wishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {state.wishlist.map((product) => (
              <div
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#303A34] bg-[#191F1C] transition-all duration-300 hover:-translate-y-1 hover:border-[#3D9B79] hover:shadow-[0_10px_30px_rgba(61,155,121,0.12)]"
              >
                {/* Product Image */}
                <div className="relative flex h-60 items-center justify-center bg-[#E9EEEA] p-6">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Heart */}
                  <button
                    type="button"
                    onClick={() => removeWishlist(product.id)}
                    aria-label={`Remove ${product.title} from wishlist`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#303A34] bg-[#191F1C] text-[#E16B6B] transition hover:scale-110 hover:bg-[#26332D]"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 truncate text-xs font-semibold uppercase tracking-[0.15em] text-[#3D9B79]">
                    {product.category}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-[#F4F6F4] transition hover:text-[#65C9A3]"
                  >
                    {product.title}
                  </Link>

                  {/* Price and Rating */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-lg font-bold text-[#3D9B79]">
                      ${Number(product.price).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-1 rounded-full border border-[#303A34] bg-[#26332D] px-2.5 py-1 text-xs font-medium text-[#F4F6F4]">
                      <Star
                        size={13}
                        fill="#FBBF24"
                        className="text-amber-400"
                      />
                      {product.rating ?? "N/A"}
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <div className="mb-4 h-px bg-[#303A34]" />

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D9B79] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#328568] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => removeWishlist(product.id)}
                        aria-label={`Remove ${product.title}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#303A34] text-[#A5AEA8] transition hover:border-[#E16B6B] hover:bg-[#E16B6B]/10 hover:text-[#E16B6B]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty Wishlist */
          <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-dashed border-[#303A34] bg-[#191F1C] px-6 py-12">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
                <Heart
                  size={35}
                  strokeWidth={1.6}
                  className="text-[#3D9B79]"
                />
              </div>

              <h2 className="mt-7 text-2xl font-bold">
                Your wishlist is empty
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#A5AEA8]">
                Save products you're interested in and they'll appear
                here whenever you're ready to shop.
              </p>

              <Link
                to="/"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D9B79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#328568]"
              >
                Continue Shopping
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
