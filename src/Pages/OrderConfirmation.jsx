
import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ShoppingBag,
  ArrowRight,
  Package,
  MapPin,
  CalendarDays,
  CreditCard,
} from "lucide-react";

const OrderConfirmation = () => {
  const { state } = useContext(ShopContext);
  const { id } = useParams();

  const order = state.orders.find(
    (item) => item.orderId === id
  );

  // Order not found
  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101412] px-4 text-[#F4F6F4]">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1E3A2F]">
            <Package size={34} className="text-[#3D9B79]" />
          </div>

          <h1 className="text-2xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#A5AEA8]">
            We couldn't find this order. Please check your
            order history or return to the homepage.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3D9B79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#328568]"
          >
            Back to Home
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCharges = order.shippingCharges ?? 0;
  const total = subtotal + shippingCharges;

  return (
    <main className="min-h-screen bg-[#101412] px-4 py-10 text-[#F4F6F4] sm:px-6 lg:py-14">
      <div className="mx-auto max-w-3xl">

        {/* Success Message */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
            <Check
              size={39}
              strokeWidth={2.5}
              className="text-[#48A878]"
            />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
            Order Confirmation
          </p>

          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-[#A5AEA8]">
            Thank you for shopping with ShopNest.
            Your order has been confirmed.
          </p>

          <p className="mt-4 text-sm text-[#A5AEA8]">
            Order ID:{" "}
            <span className="font-semibold text-[#3D9B79]">
              {order.orderId}
            </span>
          </p>
        </div>

        {/* Order Summary */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-[#303A34] bg-[#191F1C] p-5 sm:p-7">

          {/* Order Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#303A34] pb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-[#A5AEA8]">
                <CalendarDays size={16} />
                Order Date
              </div>

              <p className="mt-2 font-semibold">
                {order.orderDate}
              </p>
            </div>

            <span className="rounded-full border border-[#305344] bg-[#1E3A2F] px-4 py-2 text-xs font-semibold text-[#65C9A3]">
              {order.status}
            </span>
          </div>

          {/* Products */}
          <div className="mb-5 mt-7 flex items-center gap-2">
            <ShoppingBag
              size={20}
              className="text-[#3D9B79]"
            />
            <h2 className="text-lg font-bold">
              Order Summary
            </h2>
          </div>

          <div className="space-y-5">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >
                {/* Image */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#E9EEEA]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                {/* Product Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-5 sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#A5AEA8]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold text-[#F4F6F4]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-7 space-y-4 border-t border-[#303A34] pt-6">
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-[#A5AEA8]">
                Subtotal
              </span>

              <span className="font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-3 text-sm">
              <span className="text-[#A5AEA8]">
                Shipping
              </span>

              <span
                className={
                  shippingCharges === 0
                    ? "font-medium text-[#65C9A3]"
                    : "font-medium"
                }
              >
                {shippingCharges === 0
                  ? "Free"
                  : `$${shippingCharges.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-[#303A34] pt-5 text-lg font-bold">
              <span>Order Total</span>

              <span className="text-[#3D9B79]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="mb-6 rounded-2xl border border-[#303A34] bg-[#191F1C] p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-2">
            <MapPin
              size={20}
              className="text-[#3D9B79]"
            />

            <h2 className="text-lg font-bold">
              Delivery Information
            </h2>
          </div>

          <div className="grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[#A5AEA8]">
                Customer Name
              </p>
              <p className="font-medium">
                {order.customer.name}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-[#A5AEA8]">
                Email Address
              </p>
              <p className="break-words font-medium">
                {order.customer.email}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-[#A5AEA8]">
                Phone Number
              </p>
              <p className="font-medium">
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-[#A5AEA8]">
                Shipping Address
              </p>
              <p className="break-words font-medium leading-6">
                {order.customer.address}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6 flex items-start gap-3 border-t border-[#303A34] pt-5">
            <CreditCard
              size={19}
              className="mt-0.5 text-[#3D9B79]"
            />

            <div>
              <p className="text-xs text-[#A5AEA8]">
                Payment Method
              </p>

              <p className="mt-1 text-sm font-medium">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D9B79] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#328568]"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/order-history"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#3D9B79] px-5 py-3.5 text-sm font-semibold text-[#65C9A3] transition hover:bg-[#1E3A2F]"
          >
            <Package size={17} />
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
