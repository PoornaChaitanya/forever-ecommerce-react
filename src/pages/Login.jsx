import React, { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  usePageTitle(currentState === "Login" ? "Sign In" : "Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 border-t bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-10 mt-10 mb-10 rounded-xl shadow-md flex flex-col gap-6 animate-fade-in"
      >
        {/* Title */}
        <div className="text-center">
          <p className="text-3xl font-semibold tracking-wide">{currentState}</p>
          <div className="w-12 h-0.5 bg-black mx-auto mt-3"></div>
        </div>

        {/* Name */}
        {currentState !== "Login" && (
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400">
              Full Name
            </label>
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400">
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400">
            Password
          </label>

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5 text-xs cursor-pointer text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-600">
          {currentState === "Login" ? (
            <p className="cursor-pointer hover:underline">
              Forgot your password?
            </p>
          ) : (
            <span></span>
          )}

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Don’t have an account? Sign up
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:underline"
            >
              Already have an account? Login
            </p>
          )}
        </div>

        {/* Button */}
        <button className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          {currentState === "Login" ? "Sign In" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-xs text-gray-400">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social */}
        <button
          type="button"
          className="border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
