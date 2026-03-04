import React from "react";
import Title from "../components/Title";
import contact_img from "../assets/contact_img.png";
import NewsletterBox from "../components/NewsletterBox";
import usePageTitle from "../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact Us");
  return (
    <div>
      <div className="text-center text-xl sm:text-2xl pt-8 sm:pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 sm:my-16 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-28">
        <img
          src={contact_img}
          alt="Laptop workspace setup"
          className="w-full h-auto rounded-lg object-cover max-h-72 sm:max-h-[500px]"
        />

        <div className="flex flex-col gap-5 sm:gap-6 max-w-md">
          <p className="font-semibold text-lg sm:text-xl text-gray-800">
            Our Store
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            4824 Beach Road <br />
            Visakhapatnam, Andhra Pradesh, India
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Tel: +91 98765 43210 <br />
            Email: support@forever.com
          </p>

          <p className="font-semibold text-lg sm:text-xl text-gray-800">
            Careers at Forever
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            We're always looking for passionate and creative individuals to join
            our growing team. Discover exciting opportunities and grow with us.
          </p>

          <button
            className="border border-black px-8 py-3 text-sm w-full sm:w-fit
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
