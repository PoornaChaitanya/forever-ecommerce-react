import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

      return cartData;
    });

    toast.success("Added to cart!", { autoClose: 1500 });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error counting cart items:", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (!cartData[itemId]) return prev;

      if (quantity <= 0) {
        delete cartData[itemId][size];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }

      return cartData;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product.id === items);
      if (!itemInfo) continue; // product no longer in catalog
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const placeOrder = (deliveryInfo, paymentMethod) => {
    if (getCartCount() === 0) return;

    const newOrder = {
      id: crypto.randomUUID(),
      items: cartItems,
      deliveryInfo: deliveryInfo || {},
      paymentMethod: paymentMethod || "cod",
      date: new Date().toLocaleDateString(),
      status: "Ready to ship",
    };

    setOrders((prev) => [...prev, newOrder]);

    setCartItems({});
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    orders,
    placeOrder,
    wishlist,
    toggleWishlist,
    isWishlisted,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
