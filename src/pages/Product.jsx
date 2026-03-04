import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import RelatedProducts from "./RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item.id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setSize("");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-1/5 w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt="dress"
                onClick={() => setImage(item)}
                className={`w-1/4 sm:w-full sm:mb-3 shrink-0 cursor-pointer border transition ${
                  item === image ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="dress" className="w-full h-auto" />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={i < productData.rating ? star_icon : star_dull_icon}
                alt="star"
                className="w-3.5"
              />
            ))}
            <p className="pl-2 text-sm text-gray-500">
              ({productData.reviews})
            </p>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <p className="text-3xl font-medium">
              {currency}
              {productData.price.toLocaleString()}
            </p>
            {productData.original &&
              productData.original > productData.price && (
                <>
                  <p className="text-lg text-gray-400 line-through">
                    {currency}
                    {productData.original.toLocaleString()}
                  </p>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {productData.discount}% OFF
                  </span>
                </>
              )}
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border border-gray-200 py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500 text-orange-500 bg-white" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData.id, size)}
            className="px-8 py-3 text-sm transition bg-black text-white active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">
            Reviews ({productData.reviews})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Designed with a perfect balance of comfort and modern style, this
            product is crafted from premium-quality materials that feel soft
            against the skin while maintaining long-lasting durability. Its
            versatile silhouette makes it suitable for both casual outings and
            more refined occasions, allowing you to transition effortlessly
            throughout the day. Every detail — from the stitching to the
            finishing — is carefully considered to deliver a clean, polished
            look.
          </p>
          <p>
            Built for everyday wear, it offers a comfortable fit, breathable
            fabric, and reliable construction that stands up to repeated use.
            The lightweight yet durable design ensures freedom of movement
            without compromising structure. Easy to care for and made to retain
            its shape and color over time, this piece is a dependable addition
            to any wardrobe, combining practicality with timeless appeal.
          </p>
        </div>

        {/* Related Products Section */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-400">Loading product...</div>
  );
};

export default Product;
