import { useContext, useState } from "react";
import { ShopContext } from "./ShopContext";
import { useNavigate } from "react-router-dom";

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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = "Name can only contain letters";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email";
    }

    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
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
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = validateForm();

    if (!validate) return;
    if (state.cart.length === 0) return;

    const subtotal = state.cart.reduce((product, total) => {
      return total + product.price * product.quantity;
    });

    const shippingCharges = 0;

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
        phone: phoneNumber,
        address: `${address}, ${city}, ${pincode}`,
      },

      items: state.cart.map((product) => ({ ...product })),

      subtotal,
      shippingCharges,
      total: subtotal + shippingCharges,

      paymentMethod:
        paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment (Demo)",
    };

    dispatch({
      type: "PLACE_ORDER",
      payload: newOrder,
    });

    navigate(`/order-confirmation/${newOrder.orderId}`);

    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setPincode("");
  };

  const subtotal = state.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const shippingCharges = 0;
  const total = subtotal + shippingCharges;

  return (
    <div className="min-h-screen bg-[#FDF8F4] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#1C1C1E] mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">
          Complete your order by providing your details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Delivery Details */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.name ? "border-red:500" : "border-gray-200"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.email ? "border-red:500" : "border-gray-200"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.phoneNumber ? "border-red:500" : "border-gray-200"}`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  placeholder="Enter your complete address"
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.address ? "border-red:500" : "border-gray-200"}`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-2">City</label>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    placeholder="Enter city"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.city ? "border-red:500" : "border-gray-200"}`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-2">Pincode</label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    type="text"
                    placeholder="Enter pincode"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.pincode ? "border-red:500" : "border-gray-200"}`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-sm font-medium">
                      Cash on Delivery
                    </span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-sm font-medium">
                      Online Payment (Demo)
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${shippingCharges.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Your order details will be saved after confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
