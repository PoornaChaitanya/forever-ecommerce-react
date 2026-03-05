import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.png";
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.png";
import menu_icon from "../assets/menu_icon.png";
import dropdown_icon from "../assets/dropdown_icon.png";
import heart_icon from "../assets/heart_icon.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const navLinks = [
  { path: "/", label: "HOME" },
  { path: "/collection", label: "COLLECTION" },
  { path: "/about", label: "ABOUT" },
  { path: "/contact", label: "CONTACT" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { setShowSearch, getCartCount, wishlist } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(false);
    setProfileOpen(false);
  }, [location]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `relative group transition-colors duration-300 ${
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p>{link.label}</p>

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <button
          aria-label="Open search"
          onClick={() => {
            setShowSearch(true);
            if (!location.pathname.includes("collection")) {
              navigate("/collection");
            }
          }}
        >
          <img src={search_icon} alt="search" className="w-5" />
        </button>
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-label="Open profile menu"
          >
            <img
              src={profile_icon}
              alt="profile icon"
              className="w-5 cursor-pointer"
            />
          </button>

          {profileOpen && (
            <div className="absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 px-5 py-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <Link to={"/orders"}>
                  <p className="cursor-pointer hover:text-black">Orders</p>
                </Link>
                <Link to={"/wishlist"}>
                  <p className="cursor-pointer hover:text-black">Wishlist</p>
                </Link>
                <Link to={"/login"}>
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist icon */}
        <Link to="/wishlist" aria-label="Wishlist" className="relative">
          <img src={heart_icon} alt="wishlist" className="w-5" />
          {wishlist.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 w-4 h-4 flex items-center justify-center bg-rose-500 text-white text-[9px] font-bold rounded-full leading-none">
              {wishlist.length > 9 ? "9+" : wishlist.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <img
            src={cart_icon}
            alt="cart icon"
            aria-label="Cart"
            className="w-5"
          />
          <p className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <button
          onClick={() => setVisible(true)}
          className="sm:hidden"
          aria-label="Open menu"
        >
          <img src={menu_icon} alt="" className="w-5" />
        </button>
      </div>

      {/* Sidebar Menu For Small Screen */}

      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </button>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b transition-colors duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
