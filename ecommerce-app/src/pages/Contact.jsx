import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-28">
        <img
          src={assets.contact_img}
          alt="Laptop workspace setup"
          className="w-full h-auto rounded-lg object-cover max-h-[500px]"
        />

        <div className="flex flex-col gap-6 max-w-md">
          <p className="font-semibold text-xl text-gray-800">Our Store</p>

          <p className="text-gray-600 leading-relaxed">
            4824 Beach Road <br />
            Visakhapatnam, Andhra Pradesh, India
          </p>

          <p className="text-gray-600 leading-relaxed">
            Tel: +91 98765 43210 <br />
            Email: support@forever.com
          </p>

          <p className="font-semibold text-xl text-gray-800">
            Careers at Forever
          </p>

          <p className="text-gray-600 leading-relaxed">
            We're always looking for passionate and creative individuals to join
            our growing team. Discover exciting opportunities and grow with us.
          </p>

          <button
            className="border border-black px-8 py-3 text-sm w-fit
      hover:bg-black hover:text-white transition-all duration-300"
          >
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
