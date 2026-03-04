import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, loading, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [sortType, setSortType] = useState("relevant");

  // Extract unique brands from products
  const allBrands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ].sort();

  // Toggle Helpers
  const toggleValue = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setBrand([]);
    setSizes([]);
    setBestsellerOnly(false);
    setPriceRange("");
    setSortType("relevant");
  };

  useEffect(() => {
    let productsCopy = [...products];

    // Search
    if (showSearch && search.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim()),
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // Subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // Size
    if (sizes.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes.some((size) => sizes.includes(size)),
      );
    }

    // Bestseller
    if (bestsellerOnly) {
      productsCopy = productsCopy.filter((item) => item.bestseller);
    }

    // Brand
    if (brand.length > 0) {
      productsCopy = productsCopy.filter((item) => brand.includes(item.brand));
    }

    // Price
    if (priceRange === "799-1199") {
      productsCopy = productsCopy.filter(
        (item) => item.price >= 799 && item.price <= 1199,
      );
    }
    if (priceRange === "1200-1599") {
      productsCopy = productsCopy.filter(
        (item) => item.price >= 1200 && item.price <= 1599,
      );
    }
    if (priceRange === "1600-1999") {
      productsCopy = productsCopy.filter(
        (item) => item.price >= 1600 && item.price <= 1999,
      );
    }

    // Sorting
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    } else if (sortType === "newest") {
      productsCopy.sort((a, b) => b.date - a.date);
    }

    setFilterProducts(productsCopy);
  }, [
    products,
    category,
    subCategory,
    brand,
    sizes,
    bestsellerOnly,
    priceRange,
    sortType,
    search,
    showSearch,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t border-gray-300">
      {/* FILTER SECTION */}
      <div className="min-w-64">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex justify-between items-center cursor-pointer sm:cursor-default"
        >
          <h2 className="text-xl font-semibold">Filters</h2>
          <img
            src={dropdown_icon}
            alt="toggle"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </div>

        <div
          className={`${showFilter ? "" : "hidden"} sm:block mt-6 space-y-6`}
        >
          {/* Category */}
          <div>
            <p className="font-medium mb-2">Category</p>
            {["Men", "Women", "Kids"].map((item) => (
              <label key={item} className="flex gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={category.includes(item)}
                  onChange={() => toggleValue(item, category, setCategory)}
                />
                {item}
              </label>
            ))}
          </div>

          {/* SubCategory */}
          <div>
            <p className="font-medium mb-2">Type</p>
            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <label key={item} className="flex gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={subCategory.includes(item)}
                  onChange={() =>
                    toggleValue(item, subCategory, setSubCategory)
                  }
                />
                {item}
              </label>
            ))}
          </div>

          {/* Size */}
          <div>
            <p className="font-medium mb-2">Size</p>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => toggleValue(size, sizes, setSizes)}
                />
                {size}
              </label>
            ))}
          </div>

          {/* Price */}
          <div>
            <p className="font-medium mb-2">Price</p>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="">All Prices</option>
              <option value="799-1199">₹799 - ₹1199</option>
              <option value="1200-1599">₹1200 - ₹1599</option>
              <option value="1600-1999">₹1600 - ₹1999</option>
            </select>
          </div>

          {/* Brand */}
          {allBrands.length > 0 && (
            <div>
              <p className="font-medium mb-2">Brand</p>
              {allBrands.map((item) => (
                <label key={item} className="flex gap-2 text-sm mb-1">
                  <input
                    type="checkbox"
                    checked={brand.includes(item)}
                    onChange={() => toggleValue(item, brand, setBrand)}
                  />
                  {item}
                </label>
              ))}
            </div>
          )}

          {/* Bestseller */}
          <div>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={bestsellerOnly}
                onChange={() => setBestsellerOnly(!bestsellerOnly)}
              />
              Bestseller Only
            </label>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearFilters}
            className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <p className="text-sm text-gray-500">
              {filterProducts.length}{" "}
              {filterProducts.length === 1 ? "Product" : "Products"}
            </p>
          </div>

          {/* Improved Sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="relevant">Sort: Relevant</option>
            <option value="newest">Sort: Newest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

        {filterProducts.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No products found.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item) => (
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
    </div>
  );
};

export default Collection;
