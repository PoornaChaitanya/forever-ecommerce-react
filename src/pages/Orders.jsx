import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const Orders = () => {
  const { currency, products, orders } = useContext(ShopContext);
  usePageTitle("My Orders");

  return (
    <div className="min-h-[70vh] border-t pt-12 sm:pt-16 px-0 bg-gray-50">
      <div className="text-2xl mb-6 sm:mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-5 bg-white rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-slate-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <div>
            <p className="text-lg font-medium text-gray-700">No orders yet</p>
            <p className="text-sm text-gray-400 mt-1">
              When you place an order, it will appear here.
            </p>
          </div>
          <Link
            to="/collection"
            className="mt-2 bg-black text-white px-8 py-3 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          {orders.map((order) =>
            Object.entries(order.items).map(([productId, sizes]) =>
              Object.entries(sizes).map(([size, quantity]) => {
                const productData = products.find(
                  (product) => product.id === productId,
                );

                if (!productData) return null;

                return (
                  <div
                    key={`${order.id}-${productId}-${size}`}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6"
                  >
                    {/* Left */}
                    <div className="flex flex-1 items-start gap-4 sm:gap-6">
                      <img
                        src={productData.image[0]}
                        alt={productData.name}
                        className="w-16 sm:w-20 rounded-lg object-cover shrink-0"
                      />

                      <div>
                        <p className="font-semibold text-sm sm:text-base text-gray-800">
                          {productData.name}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-gray-500 text-sm">
                          <p className="font-medium text-gray-800">
                            {currency}
                            {productData.price.toLocaleString()}
                          </p>
                          <span className="text-gray-300">|</span>
                          <p>Qty: {quantity}</p>
                          <span className="text-gray-300">|</span>
                          <p>Size: {size}</p>
                        </div>

                        <p className="mt-1.5 text-xs text-gray-400">
                          Ordered on {order.date}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:flex-col md:items-end">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                        <p className="text-sm text-gray-600">{order.status}</p>
                      </div>

                      <button className="border border-gray-300 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg hover:bg-black hover:text-white hover:border-black transition">
                        Track Order
                      </button>
                    </div>
                  </div>
                );
              }),
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
