import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const Wishlist = () => {
  const { products, wishlist } = useContext(ShopContext);
  usePageTitle("My Wishlist");

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="border-t pt-10 sm:pt-14 min-h-[70vh]">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Your wishlist is empty
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tap the ♥ on any product to save it here.
            </p>
          </div>
          <Link
            to="/collection"
            className="mt-2 bg-black text-white px-8 py-3 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-6">
            {wishlistedProducts.length}{" "}
            {wishlistedProducts.length === 1 ? "item" : "items"} saved
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {wishlistedProducts.map((item) => (
              <ProductItem
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                original={item.original}
                discount={item.discount}
                brand={item.brand}
                rating={item.rating}
                isNew={item.new}
                stock={item.stock}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
