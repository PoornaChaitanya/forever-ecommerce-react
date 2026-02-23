import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-5"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black transition"
        required
      />

      <div className="w-full flex justify-between items-center text-sm -mt-2">
        {currentState === "Login" ? (
          <p className="cursor-pointer hover:underline">
            Forgot your password?
          </p>
        ) : (
          <span />
        )}

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:underline"
          >
            Don't have an account? Sign up
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

      <button className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
