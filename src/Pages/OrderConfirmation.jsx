import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { useParams } from "react-router-dom";


const OrderConfirmation = () => {

  const {state} = useContext(ShopContext);
  const {id} = useParams();
  const order = state.orders.find(
    (item)=> item.orderId === id);

    if(!order){
      return <h2>Order Not Found</h2>
    }

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + order.shippingCharges;

  return (
    <div className="min-h-screen bg-[#FDF8F4] px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Success Message */}
        <div className="text-center mb-10">

          <div className="w-20 h-20 rounded-full bg-purple-100 
            flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-10 h-10 text-[#7C5CFF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-[#1C1C1E] mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500">
            Thank you for shopping with ShopNest.
            Your order has been confirmed.
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Order ID:{" "}
            <span className="font-semibold text-[#7C5CFF]">
           {order.orderId}
            </span>
          </p>

        </div>

        {/* Order Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">

          <div className="flex justify-between items-center 
            flex-wrap gap-3 border-b pb-5">

            <div>
              <p className="text-sm text-gray-500">state.order</p>
              <p className="font-semibold text-[#1C1C1E] mt-1">
                {order.orderDate}
              </p>
            </div>

            <span className="bg-green-100 text-green-700 
              px-4 py-2 rounded-full text-sm font-medium">
              {order.status}
            </span>

          </div>

          {/* Products */}
          <h2 className="text-lg font-bold text-[#1C1C1E] mt-6 mb-5">
            Order Summary
          </h2>

          <div className="space-y-5">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >

                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl 
                    bg-gray-100"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#1C1C1E]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-[#1C1C1E]">
                  ₹{item.price * item.quantity}
                </p>

              </div>
            ))}

          </div>

          {/* Price Details */}
          <div className="border-t mt-6 pt-5 space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {order.shippingCharges === 0
                  ? "Free"
                  : `₹${order.shippingCharges}`}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 
              text-lg font-bold text-[#1C1C1E]">
              <span>Total Paid</span>
              <span className="text-[#7C5CFF]">₹{total}</span>
            </div>

          </div>

        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">

          <h2 className="text-lg font-bold text-[#1C1C1E] mb-5">
            Delivery Information
          </h2>

          <div className="space-y-3 text-sm">

            <div>
              <p className="text-gray-500">Customer Name</p>
              <p className="font-medium text-[#1C1C1E]">
                {order.customer.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email Address</p>
              <p className="font-medium text-[#1C1C1E]">
                {order.customer.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone Number</p>
              <p className="font-medium text-[#1C1C1E]">
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Shipping Address</p>
              <p className="font-medium text-[#1C1C1E]">
                {order.customer.address}
              </p>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => window.location.href = "/"}
            className="flex-1 bg-[#7C5CFF] text-white py-3 
              rounded-xl font-semibold hover:bg-[#6846eb] 
              transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => window.location.href = "/my-orders"}
            className="flex-1 border border-[#7C5CFF] 
              text-[#7C5CFF] py-3 rounded-xl font-semibold 
              hover:bg-purple-50 transition"
          >
            View My Orders
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
