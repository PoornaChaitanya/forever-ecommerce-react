import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const Orders = () => {
  const { currency, products, orders, delivery_fee } = useContext(ShopContext);
  usePageTitle("My Orders");

  const getOrderTotal = (orderItems) => {
    let total = 0;
    let hasItems = false;

    // Check if orderItems is an array (to support older or variant structures if needed)
    // or an object (as currently defined by placeOrder)
    if (typeof orderItems === "object" && !Array.isArray(orderItems)) {
      for (const itemId in orderItems) {
        const itemInfo = products.find((product) => product.id === itemId);
        if (itemInfo) {
          for (const size in orderItems[itemId]) {
            if (orderItems[itemId][size] > 0) {
              hasItems = true;
              total += itemInfo.price * orderItems[itemId][size];
            }
          }
        }
      }
    }

    return hasItems ? total + delivery_fee : 0;
  };

  return (
    <div className="min-h-[70vh] border-t border-gray-100 pt-12 sm:pt-16 pb-16 px-4 sm:px-0 bg-white sm:bg-transparent">
      <div className="text-2xl mb-8 sm:mb-10 font-bold">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-900 mb-2">
            No orders found
          </p>
          <p className="text-sm text-gray-500 max-w-sm mb-8">
            Looks like you haven't made your choice yet. Explore our latest
            collection and find something you love.
          </p>
          <Link
            to="/collection"
            className="bg-black text-white px-8 py-3.5 rounded-full text-sm hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl">
          {[...orders].reverse().map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="bg-gray-50/80 px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900 tracking-tight">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 text-[10px] sm:text-xs font-bold shadow-sm tracking-wider">
                      {order.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500 font-medium tracking-wide mb-0.5">
                    Total Amount
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {currency}
                    {getOrderTotal(order.items).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-4 sm:px-6 py-2 divide-y divide-gray-100">
                {Object.entries(order.items).map(([productId, sizes]) =>
                  Object.entries(sizes).map(([size, quantity]) => {
                    if (quantity <= 0) return null;

                    const productData = products.find(
                      (product) => product.id === productId,
                    );
                    if (!productData) return null;

                    return (
                      <div
                        key={`${productId}-${size}`}
                        className="py-5 flex items-start sm:items-center gap-4 sm:gap-6"
                      >
                        <Link
                          to={`/product/${productId}`}
                          className="shrink-0 bg-gray-50 rounded-xl p-1 border border-gray-100"
                        >
                          <img
                            src={productData.image[0]}
                            alt={productData.name}
                            className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6">
                          <div className="flex flex-col gap-1.5">
                            <Link
                              to={`/product/${productId}`}
                              className="text-base font-medium text-gray-900 hover:text-black transition-colors line-clamp-2"
                            >
                              {productData.name}
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <p>
                                Size:{" "}
                                <span className="font-medium text-gray-800">
                                  {size}
                                </span>
                              </p>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <p>
                                Qty:{" "}
                                <span className="font-medium text-gray-800">
                                  {quantity}
                                </span>
                              </p>
                            </div>
                            <div className="sm:hidden mt-1">
                              <p className="text-sm font-semibold text-gray-900">
                                {currency}
                                {productData.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:block text-right shrink-0">
                            <p className="text-base font-semibold text-gray-900">
                              {currency}
                              {productData.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }),
                )}
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50/50 px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <p className="text-sm font-medium text-gray-700">
                    {order.status}
                  </p>
                </div>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all shadow-sm">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
