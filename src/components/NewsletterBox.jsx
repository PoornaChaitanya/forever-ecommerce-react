import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="py-10 sm:py-16 px-4 text-center bg-gray-50 rounded-lg shadow-sm">
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
        Get 20% Off On Your First Order
      </p>

      <p className="text-gray-500 mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
        Be the first to discover new arrivals, exclusive offers, and curated
        style updates — delivered straight to your inbox.
      </p>

      <div className="w-full max-w-xl mx-auto mt-6 sm:mt-8">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 sm:border sm:border-gray-300 sm:rounded-md sm:overflow-hidden"
        >
          <input
            className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-gray-400 border border-gray-300 rounded-md sm:border-none sm:rounded-none"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs sm:text-sm px-6 sm:px-8 py-3 hover:bg-gray-800 transition rounded-md sm:rounded-none"
          >
            SUBSCRIBE
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default NewsletterBox;
