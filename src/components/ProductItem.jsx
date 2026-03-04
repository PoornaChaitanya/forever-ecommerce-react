import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";

const ProductItem = ({
  id,
  image,
  name,
  price,
  original,
  discount,
  brand,
  rating,
  isNew,
  stock,
}) => {
  const { currency, toggleWishlist, isWishlisted } = useContext(ShopContext);
  const wishlisted = isWishlisted(id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
      {/* Wishlist button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(id);
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2.5 right-2.5 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill={wishlisted ? "#f43f5e" : "none"}
          stroke={wishlisted ? "#f43f5e" : "#94a3b8"}
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5">
        {discount > 0 && (
          <span className="bg-rose-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="bg-violet-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
            New
          </span>
        )}
      </div>

      {/* Out of Stock Overlay */}
      {stock === 0 && (
        <div className="absolute inset-0 bg-white/75 z-20 flex items-center justify-center backdrop-blur-[2px]">
          <span className="bg-slate-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            Sold Out
          </span>
        </div>
      )}

      {/* Image — wrapped in Link */}
      <Link to={`/product/${id}`} className="block">
        <div className="overflow-hidden bg-slate-50 aspect-square w-full">
          <img
            src={image[0]}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content */}
        <div className="px-3 py-3 flex flex-col gap-1.5">
          {/* Brand */}
          {brand && (
            <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest line-clamp-1">
              {brand}
            </p>
          )}

          {/* Name */}
          <h3 className="text-[13px] font-semibold text-slate-800 leading-tight line-clamp-1 group-hover:text-black transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <img
                  key={i}
                  src={i < rating ? star_icon : star_dull_icon}
                  alt=""
                  className="w-2.5"
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">
                {rating}.0
              </span>
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[15px] font-bold text-slate-900">
              {currency}
              {price.toLocaleString()}
            </span>
            {original && original > price && (
              <span className="text-[11px] text-slate-400 line-through">
                {currency}
                {original.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
