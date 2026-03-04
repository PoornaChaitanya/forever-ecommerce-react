import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products, loading, error, fetchProducts } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
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
      <div className="text-center py-6 sm:py-8 text-2xl sm:text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Step into the new season with our latest arrivals. Designed with
          modern trends in mind and crafted for comfort, this collection brings
          fresh energy to your wardrobe.
        </p>
      </div>

      {/* Rendering Products */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 sm:gap-y-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-square"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 sm:gap-y-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
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

export default LatestCollection;
