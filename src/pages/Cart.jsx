import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import bin_icon from "../assets/bin_icon.png";
import CartTotal from "../components/CartTotal";
import usePageTitle from "../hooks/usePageTitle";

const Cart = () => {
  usePageTitle("Your Cart");
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-10 sm:pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Empty state */}
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-slate-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Looks like you haven't added anything yet.
            </p>
          </div>
          <button
            onClick={() => navigate("/collection")}
            className="mt-2 bg-black text-white px-8 py-3 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product.id === item._id,
              );

              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-t text-gray-700 grid grid-cols-[3fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-3 sm:gap-4"
                >
                  <div className="flex items-start gap-3 sm:gap-6">
                    <img
                      className="w-14 sm:w-20 rounded-md shrink-0"
                      src={productData.image[0]}
                      alt="product"
                    />
                    <div>
                      <p className="text-xs sm:text-base font-medium leading-snug">
                        {productData.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                        <p className="font-medium text-sm sm:text-base">
                          {currency}
                          {productData.price.toLocaleString()}
                        </p>
                        {productData.original &&
                          productData.original > productData.price && (
                            <p className="text-xs text-gray-400 line-through">
                              {currency}
                              {productData.original.toLocaleString()}
                            </p>
                          )}
                        <p className="px-2 py-0.5 border border-gray-200 bg-slate-50 text-xs sm:text-sm">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition text-base font-medium"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      disabled={item.quantity >= 99}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={bin_icon}
                    alt="delete"
                    className="w-4 cursor-pointer mx-auto"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-12 sm:my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />

              <div className="w-full mt-4">
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full bg-black text-white text-sm my-4 sm:my-8 px-8 py-3 active:bg-black/80 hover:bg-gray-800 transition"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
