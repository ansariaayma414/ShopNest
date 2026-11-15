
import { useContext, useState } from "react";
import { ShopContext } from "./ShopContext";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const { state, dispatch } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shippingCharges = 0;
  const total = subtotal + shippingCharges;

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email";
    }

    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    if (address.trim() === "") {
      newErrors.address = "Please enter your address";
    }

    if (city.trim() === "") {
      newErrors.city = "City is required";
    }

    if (pincode.trim() === "") {
      newErrors.pincode = "Pincode cannot be empty";
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (state.cart.length === 0) return;

    const newOrder = {
      orderId: `SN-${Date.now()}`,

      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),

      status: "Confirmed",

      customer: {
        name: name.trim(),
        email: email.trim(),
        phone: phoneNumber.trim(),
        address: `${address.trim()}, ${city.trim()}, ${pincode.trim()}`,
      },

      items: state.cart.map((product) => ({ ...product })),

      subtotal,
      shippingCharges,
      total,

      paymentMethod:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : "Online Payment (Demo)",
    };

    dispatch({
      type: "PLACE_ORDER",
      payload: newOrder,
    });

    navigate(`/order-confirmation/${newOrder.orderId}`);
  };

  const inputClass = (error) =>
    `w-full rounded-lg border bg-[#141916] px-4 py-3 text-sm
     text-[#F4F6F4] outline-none placeholder:text-[#77847D]
     transition focus:ring-2 focus:ring-[#3D9B79]/15
     ${
       error
         ? "border-[#E16B6B]"
         : "border-[#303A34] focus:border-[#3D9B79]"
     }`;

  return (
    <main className="min-h-screen bg-[#101412] px-4 py-10 text-[#F4F6F4] sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
            Almost There
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-[#A5AEA8]">
            Complete your order by providing your delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">

          {/* Delivery Information */}
          <section className="rounded-2xl border border-[#303A34] bg-[#191F1C] p-5 sm:p-7">

            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A2F] text-[#3D9B79]">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Delivery Information
                </h2>
                <p className="mt-1 text-xs text-[#A5AEA8]">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Full Name */}
              <div>
                <label htmlFor="checkout-name" className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(errors.name)}
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-[#E16B6B]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass(errors.email)}
                />

                {errors.email && (
                  <p className="mt-2 text-xs text-[#E16B6B]">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="checkout-phone" className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  id="checkout-phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your 10-digit phone number"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  aria-invalid={Boolean(errors.phoneNumber)}
                  className={inputClass(errors.phoneNumber)}
                />

                {errors.phoneNumber && (
                  <p className="mt-2 text-xs text-[#E16B6B]">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="checkout-address" className="mb-2 block text-sm font-medium">
                  Delivery Address
                </label>

                <textarea
                  id="checkout-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="House number, street, area, landmark..."
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.address)}
                  className={`${inputClass(errors.address)} resize-none`}
                />

                {errors.address && (
                  <p className="mt-2 text-xs text-[#E16B6B]">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City + Pincode */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-city" className="mb-2 block text-sm font-medium">
                    City
                  </label>

                  <input
                    id="checkout-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.city)}
                    className={inputClass(errors.city)}
                  />

                  {errors.city && (
                    <p className="mt-2 text-xs text-[#E16B6B]">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-pincode" className="mb-2 block text-sm font-medium">
                    Pincode
                  </label>

                  <input
                    id="checkout-pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit pincode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={6}
                    aria-invalid={Boolean(errors.pincode)}
                    className={inputClass(errors.pincode)}
                  />

                  {errors.pincode && (
                    <p className="mt-2 text-xs text-[#E16B6B]">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-t border-[#303A34] pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A2F] text-[#3D9B79]">
                    <CreditCard size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      Payment Method
                    </h2>
                    <p className="mt-1 text-xs text-[#A5AEA8]">
                      Select your preferred payment option.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-[#3D9B79] bg-[#1E3A2F]"
                        : "border-[#303A34] bg-[#141916] hover:border-[#3D9B79]/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 accent-[#3D9B79]"
                    />

                    <Banknote size={20} className="text-[#3D9B79]" />

                    <span className="text-sm font-medium">
                      Cash on Delivery
                    </span>
                  </label>

                  {/* Online Payment */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "online"
                        ? "border-[#3D9B79] bg-[#1E3A2F]"
                        : "border-[#303A34] bg-[#141916] hover:border-[#3D9B79]/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 accent-[#3D9B79]"
                    />

                    <CreditCard size={20} className="text-[#3D9B79]" />

                    <div>
                      <p className="text-sm font-medium">
                        Online Payment (Demo)
                      </p>
                      <p className="mt-1 text-xs text-[#A5AEA8]">
                        No real payment will be processed.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={state.cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D9B79] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#328568] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place Order
                <ArrowRight size={18} />
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-[#303A34] bg-[#191F1C] p-6 lg:sticky lg:top-24">
            <div className="mb-6 flex items-center gap-3">
              <ShoppingBag size={21} className="text-[#3D9B79]" />
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>
            </div>

            {/* Cart Products */}
            <div className="mb-6 max-h-72 space-y-4 overflow-y-auto">
              {state.cart.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#E9EEEA]">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {product.title}
                    </p>
                    <p className="mt-1 text-xs text-[#A5AEA8]">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-semibold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-[#303A34] pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-[#A5AEA8]">Subtotal</span>
                <span className="font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#A5AEA8]">Shipping</span>
                <span className="font-medium text-[#65C9A3]">
                  {shippingCharges === 0
                    ? "Free"
                    : `$${shippingCharges.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="my-5 h-px bg-[#303A34]" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Total</span>
              <span className="text-2xl font-bold text-[#3D9B79]">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-xl bg-[#1E3A2F] p-3 text-xs leading-5 text-[#A5AEA8]">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-[#3D9B79]"
              />
              <p>
                Your order details will be saved after confirmation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
