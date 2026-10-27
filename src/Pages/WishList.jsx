import { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { state, dispatch } = useContext(ShopContext);

  const removeWishlist = (id) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 border-b border-gray-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7C5CFF]">
              Your collection
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#1C1C1E] sm:text-4xl">
              Wishlist
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Products you love, saved for later.
            </p>
          </div>

          {state.wishlist.length > 0 && (
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
              {state.wishlist.length}{" "}
              {state.wishlist.length === 1 ? "item" : "items"}
            </div>
          )}
        </div>

        {/* Wishlist */}
        {state.wishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {state.wishlist.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <div className="relative flex h-60 items-center justify-center bg-gray-50 p-6">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => removeWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-red-500 shadow-sm transition hover:scale-110 hover:bg-red-50"
                  >
                    ♥
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5">

                  <p className="mb-2 truncate text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7C5CFF]">
                    {product.category}
                  </p>

                  <h2 className="truncate text-base font-semibold text-[#1C1C1E]">
                    {product.title}
                  </h2>

                  {/* Price + Rating */}
                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-lg font-bold text-[#1C1C1E]">
                      ${product.price}
                    </p>

                    <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                      <span className="text-yellow-500">★</span>
                      {product.rating}
                    </div>

                  </div>

                  <div className="my-4 border-t border-gray-100" />

                  {/* Actions */}
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: product,
                        })
                      }
                      className="flex-1 rounded-xl bg-[#1C211F] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2D3431] active:scale-[0.98]"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeWishlist(product.id)}
                      className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty Wishlist */
          <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white">

            <div className="max-w-md px-6 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                <span className="text-4xl text-gray-300">
                  ♡
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#1C1C1E]">
                Your wishlist is empty
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Save products you're interested in and they'll appear here
                whenever you're ready to shop.
              </p>

              <Link to ="/"><button className="mt-7 rounded-xl bg-[#1C211F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2D3431]">
                Continue Shopping
              </button>
              </Link>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;




