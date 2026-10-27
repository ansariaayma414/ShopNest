import { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { ShopProvider } from "./ShopContext";

const Cart = () => {
  const { state ,dispatch} = useContext(ShopContext);

  const removeCart = (id) => {
    dispatch({
      type:"REMOVE_FROM_CART",
      payload:id,
    })
  };
  
  return (
    <div className="min-h-screen bg-[#FDF8F4] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C1E]">Your Cart</h1>
          <p className="mt-2 text-gray-500">
            Review the products you added to your cart.
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {state.cart.length > 0 ? (
            state.cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center gap-5">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-[#1C1C1E]">
                      {product.title}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-[#7C5CFF]">
                      ${product.price}
                    </p>
                  </div>
                </div>

                {/* Remove Button - UI for now */}
                <button onClick={() => removeCart(product.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-[#1C1C1E]">
                Your cart is empty
              </h2>

              <p className="mt-2 text-gray-500">
                Add some products to your cart to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
