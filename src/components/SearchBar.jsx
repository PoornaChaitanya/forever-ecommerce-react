import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import search_icon from "../assets/search_icon.png";
import cross_icon from "../assets/cross_icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const inputRef = useRef(null);

  const isCollectionPage = location.pathname.includes("collection");

  // Auto-focus input when the bar becomes visible
  useEffect(() => {
    if (showSearch && isCollectionPage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch, isCollectionPage]);

  return showSearch && isCollectionPage ? (
    <div className="border-t border-b border-gray-200 bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm focus-within:ring-1 focus-within:ring-black transition">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={search_icon} alt="search" className="w-4 opacity-50" />
      </div>
      <img
        src={cross_icon}
        alt="close search"
        className="inline w-3 cursor-pointer opacity-60 hover:opacity-100 transition"
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
      />
    </div>
  ) : null;
};

export default SearchBar;
