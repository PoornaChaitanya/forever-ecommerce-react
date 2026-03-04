import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products, loading, error, fetchProducts } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  if (error) {
    return (
      <div className="my-6 sm:my-10 text-center py-12">
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="my-6 sm:my-10">
      <div className="text-center text-2xl sm:text-3xl py-6 sm:py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Discover the pieces our customers can't stop loving. These best
          sellers combine timeless design, everyday comfort, and unmatched
          quality — trusted by thousands and styled for every occasion.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 sm:gap-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-square"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 sm:gap-y-6">
          {bestSeller.map((item) => (
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
      )}
    </div>
  );
};

export default BestSeller;
