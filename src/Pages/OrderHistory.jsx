
import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

export const OrderHistory = () => {
  const { state } = useContext(ShopContext);

  const orders = [...state.orders].reverse();

  return (
    <main className="min-h-screen bg-[#101412] px-4 py-10 text-[#F4F6F4] sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              Your Purchases
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-3 text-sm text-[#A5AEA8]">
              View your previous orders and purchase details.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#303A34] bg-[#191F1C] px-5 py-3">
            <Package size={20} className="text-[#3D9B79]" />

            <div>
              <p className="text-xs text-[#A5AEA8]">
                Total Orders
              </p>

              <p className="text-lg font-bold">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.orderId}
                className="overflow-hidden rounded-2xl border border-[#303A34] bg-[#191F1C] transition hover:border-[#3D9B79]/60"
              >

                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#303A34] p-5 sm:p-6">
                  <div>
                    <p className="text-xs text-[#A5AEA8]">
                      Order ID
                    </p>

                    <h2 className="mt-1 text-sm font-bold text-[#F4F6F4] sm:text-base">
                      {order.orderId}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-xs text-[#A5AEA8]">
                      <CalendarDays size={14} />
                      {order.orderDate}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-[#305344] bg-[#1E3A2F] px-4 py-2 text-xs font-semibold text-[#65C9A3]">
                    <CheckCircle2 size={15} />
                    {order.status}
                  </span>
                </div>

                {/* Purchased Products */}
                <div className="space-y-5 p-5 sm:p-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >
                      {/* Product Image */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#E9EEEA] sm:h-24 sm:w-24">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-contain p-2"
                          loading="lazy"
                        />
                      </div>

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-5 text-[#F4F6F4] sm:text-base">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs text-[#A5AEA8]">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-xs text-[#A5AEA8]">
                          ${Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      {/* Item Total */}
                      <p className="shrink-0 text-sm font-semibold text-[#F4F6F4] sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="border-t border-[#303A34] bg-[#141916] p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-6">
                      {/* Order Total */}
                      <div>
                        <p className="mb-1 text-xs text-[#A5AEA8]">
                          Order Total
                        </p>

                        <p className="text-xl font-bold text-[#3D9B79]">
                          ${Number(order.total).toFixed(2)}
                        </p>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <p className="mb-1 text-xs text-[#A5AEA8]">
                          Payment Method
                        </p>

                        <p className="flex items-center gap-2 text-sm font-medium text-[#F4F6F4]">
                          <CreditCard
                            size={15}
                            className="text-[#3D9B79]"
                          />
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* View Details */}
                    <Link
                      to={`/order-confirmation/${order.orderId}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3D9B79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#328568]"
                    >
                      View Details
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : (

          /* Empty Order History */
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl border border-[#303A34] bg-[#191F1C] px-6 py-12 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#305344] bg-[#1E3A2F]">
              <ShoppingBag
                size={35}
                strokeWidth={1.6}
                className="text-[#3D9B79]"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#F4F6F4]">
              No Orders Yet
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#A5AEA8]">
              You haven't placed any orders yet.
              Start exploring our products and find something you love.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#3D9B79] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#328568]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistory;
