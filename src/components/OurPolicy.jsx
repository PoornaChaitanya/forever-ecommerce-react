import React from "react";
import exchange_icon from "../assets/exchange_icon.png";
import quality_icon from "../assets/quality_icon.png";
import support_img from "../assets/support_img.png";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-2 text-center py-10 md:py-20 text-xs sm:text-sm md:text-base text-gray-700 px-4 sm:px-0">
      <div>
        <img
          src={exchange_icon}
          alt="exchange"
          className="w-10 sm:w-12 m-auto mb-4 sm:mb-5"
        />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <img
          src={quality_icon}
          alt="quality"
          className="w-10 sm:w-12 m-auto mb-4 sm:mb-5"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <img
          src={support_img}
          alt="exchange"
          className="w-10 sm:w-12 m-auto mb-4 sm:mb-5"
        />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer suppport</p>
      </div>
    </div>
  );
};

export default OurPolicy;
