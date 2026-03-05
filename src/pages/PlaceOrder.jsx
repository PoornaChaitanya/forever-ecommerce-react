import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import stripe_logo from "../assets/stripe_logo.png";
import razorpay_logo from "../assets/razorpay_logo.png";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import usePageTitle from "../hooks/usePageTitle";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, placeOrder, cartItems } = useContext(ShopContext);
  usePageTitle("Checkout");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const { firstName, lastName, email, street, city, state, zipcode, phone } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zipcode ||
      !phone
    ) {
      toast.error("Please fill in all delivery fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    placeOrder(formData, method);
    toast.success("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
        />

        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Zipcode"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
          />
        </div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="w-full sm:min-w-80 sm:max-w-sm">
        <div className="mt-4 sm:mt-8">
          <CartTotal />
        </div>

        <div className="mt-8 sm:mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method */}
          <div className="flex gap-4 flex-col mt-5">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex-1 flex items-center justify-start  gap-4 border p-3 cursor-pointer rounded-lg transition-colors ${method === "stripe" ? "border-black bg-gray-50" : "border-gray-200"}`}
            >
              <span
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full transition-colors ${method === "stripe" ? "bg-green-500 border-green-500" : "bg-white"}`}
              ></span>
              <img
                src={stripe_logo}
                alt="stripe logo"
                className="h-5 object-contain"
              />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className={`flex-1 flex items-center justify-start gap-4 border p-3 cursor-pointer rounded-lg transition-colors ${method === "razorpay" ? "border-black bg-gray-50" : "border-gray-200"}`}
            >
              <span
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full transition-colors ${method === "razorpay" ? "bg-green-500 border-green-500" : "bg-white"}`}
              ></span>
              <img
                src={razorpay_logo}
                alt="razorpay logo"
                className="h-5 object-contain"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex-1 flex items-center justify-start gap-4 border p-3 cursor-pointer rounded-lg transition-colors ${method === "cod" ? "border-black bg-gray-50" : "border-gray-200"}`}
            >
              <span
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full transition-colors ${method === "cod" ? "bg-green-500 border-green-500" : "bg-white"}`}
              ></span>
              <span className="text-gray-700 text-sm font-semibold whitespace-nowrap">
                CASH ON DELIVERY
              </span>
            </div>
          </div>

          <div className="w-full mt-6 sm:mt-8">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
