import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* About Section */}
      <div className="text-2xl text-center pt-16 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src={assets.about_img}
          alt="Fashion collection showcase"
          className="w-full rounded-xl shadow-md object-cover"
        />
        <div className="flex flex-col gap-6  text-gray-600">
          <p>
            At Forever, we believe fashion should feel effortless, timeless, and
            accessible to everyone. Our journey began with a simple goal — to
            create thoughtfully designed pieces that combine comfort, quality,
            and modern style. Every collection is carefully curated to reflect
            trends while maintaining versatility for everyday wear.
          </p>
          <p>
            We focus on premium materials, refined details, and durable
            craftsmanship to ensure each product meets our highest standards.
            Whether you're dressing for work, a casual outing, or a special
            occasion, our designs are made to adapt seamlessly to your
            lifestyle.
          </p>
          <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
          <p>
            Our mission is to deliver high-quality fashion that empowers
            confidence and self-expression. We aim to build a brand that values
            sustainability, transparency, and customer satisfaction — creating
            pieces that not only look good but feel good to wear.
          </p>
        </div>
      </div>

      <hr className="my-16 border-gray-200" />

      {/* Why Section */}
      <div className="text-xl py-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We prioritize premium fabrics and expert craftsmanship to ensure
            long-lasting durability and exceptional comfort in every product.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <b>Convenience</b>
          <p className="text-gray-600">
            Enjoy a seamless shopping experience with easy navigation, secure
            checkout, and fast, reliable delivery to your doorstep.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is always ready to assist you, ensuring a
            smooth and satisfying experience from browsing to delivery.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;
