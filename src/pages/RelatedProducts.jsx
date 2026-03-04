import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const RelatedProducts = ({ category, subCategory, productId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory,
      );
      // Exclude the currently open product
      productsCopy = productsCopy.filter((item) => item.id !== productId);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory, productId]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
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
    </div>
  );
};

export default RelatedProducts;
