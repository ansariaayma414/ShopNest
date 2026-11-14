import { useContext } from "react";
import { ShopContext } from "./ShopContext";
import {useNavigate} from "react-router-dom";
const Cart = () => {
  const { state, dispatch } = useContext(ShopContext);

  const subtotal = state.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shippingCharges = 0;
  const total = subtotal + shippingCharges;
  const navigate = useNavigate();

  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const increaseQuantity = (id) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: id,
    });
  };

  const decreaseQuantity = (id) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: id,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C1E]">
            Your Cart
          </h1>
          <p className="mt-2 text-gray-500">
            Review the products you added to your cart.
          </p>
        </div>

        {state.cart.length > 0 ? (
          /* Main Cart Layout */
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[2fr_1fr]">

            {/* Cart Items Section */}
            <div className="space-y-4">
              {state.cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Product Information */}
                  <div className="flex items-center gap-5">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-24 w-24 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-lg font-semibold text-[#1C1C1E]">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-lg font-bold text-[#1C1C1E]">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                         className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg font-semibold text-[#1C1C1E] transition hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center font-semibold text-[#1C1C1E]">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                         className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1C1E] text-lg font-semibold text-white transition hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCart(product.id)}
                  className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#1C1C1E] transition hover:bg-gray-100 sm:self-center"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="mb-6 text-xl font-semibold text-[#1C1C1E]">
                Order Summary
              </h2>

              <div className="mb-4 flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="mb-4 flex justify-between">
                <span className="text-gray-500">Shipping Charges</span>
                <span className="font-medium text-green-600">
                  ${shippingCharges.toFixed(2)}
                </span>
              </div>

              <hr className="my-5" />

              <div className="mb-5 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text[#1C1C1E]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button onClick = {()=>{navigate("/checkout")} }className="w-full rounded-lg bg-[#1C1C1E] py-3 font-medium text-white transition hover:bg-gray-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          /* Empty Cart */
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
  );
};

export default Cart;

