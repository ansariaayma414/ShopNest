
import { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const Cart = () => {
  const { state, dispatch } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shippingCharges = 0;
  const total = subtotal + shippingCharges;

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
    <main className="min-h-screen bg-[#101412] px-4 py-10 text-[#F4F6F4] md:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
            Your Shopping Bag
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Your Cart
          </h1>

          <p className="mt-3 text-sm text-[#A5AEA8]">
            Review your selected products before checkout.
          </p>
        </div>

        {state.cart.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">

            {/* Cart Items */}
            <div className="space-y-4">
              {state.cart.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col gap-5 rounded-2xl border border-[#303A34] bg-[#191F1C] p-4 transition-all duration-300 hover:border-[#3D9B79]/60 sm:flex-row sm:items-center sm:p-5"
                >

                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex h-28 w-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#E9EEEA]"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="min-w-0 flex-1">
                    <h2
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="cursor-pointer text-base font-semibold text-[#F4F6F4] transition hover:text-[#3D9B79] md:text-lg"
                    >
                      {product.title}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-[#3D9B79]">
                      ${Number(product.price).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex w-fit items-center overflow-hidden rounded-lg border border-[#303A34] bg-[#141916]">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(product.id)}
                        disabled={product.quantity <= 1}
                        aria-label={`Decrease quantity of ${product.title}`}
                        className="flex h-9 w-9 items-center justify-center transition hover:bg-[#26332D] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="flex h-9 w-11 items-center justify-center border-x border-[#303A34] text-sm font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(product.id)}
                        disabled={
                          product.stock !== undefined &&
                          product.quantity >= product.stock
                        }
                        aria-label={`Increase quantity of ${product.title}`}
                        className="flex h-9 w-9 items-center justify-center transition hover:bg-[#26332D] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeCart(product.id)}
                    aria-label={`Remove ${product.title} from cart`}
                    className="flex w-fit items-center gap-2 self-start rounded-lg border border-[#303A34] px-3 py-2 text-sm text-[#A5AEA8] transition hover:border-[#E16B6B] hover:bg-[#E16B6B]/10 hover:text-[#E16B6B] sm:self-center"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-[#3D9B79] transition hover:text-[#65C9A3]"
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-[#303A34] bg-[#191F1C] p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <p className="mt-2 text-xs text-[#A5AEA8]">
                {state.cart.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}{" "}
                items in your cart
              </p>

              <div className="mt-7 space-y-5">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#A5AEA8]">Subtotal</span>

                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#A5AEA8]">
                    Shipping Charges
                  </span>

                  <span className="font-medium text-[#65C9A3]">
                    {shippingCharges === 0
                      ? "Free"
                      : `$${shippingCharges.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="my-6 h-px bg-[#303A34]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#3D9B79]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D9B79] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#328568]"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#A5AEA8]">
                <ShieldCheck size={16} className="text-[#3D9B79]" />
                Review your order before placing it
              </div>
            </aside>
          </div>
        ) : (

          /* Empty Cart */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#303A34] bg-[#191F1C] px-6 py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
              <ShoppingCart
                size={34}
                strokeWidth={1.6}
                className="text-[#3D9B79]"
              />
            </div>

            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#A5AEA8]">
              Looks like you haven't added anything yet.
              Explore our collections and find something you love.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-7 flex items-center gap-2 rounded-lg bg-[#3D9B79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#328568]"
            >
              Explore Products
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
