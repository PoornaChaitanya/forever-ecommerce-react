import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const cartAmount = getCartAmount();
  const threshold = 1000;
  const shippingFee =
    cartAmount === 0 ? 0 : cartAmount >= threshold ? 0 : delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {cartAmount.toLocaleString()}.00
          </p>
        </div>
        <hr />

        <div className="flex justify-between items-center">
          <p>Shipping fee</p>
          <p>
            {shippingFee === 0 && cartAmount > 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `${currency}${shippingFee}.00`
            )}
          </p>
        </div>
        {cartAmount > 0 && cartAmount < threshold && (
          <p className="text-xs text-gray-500 mt-1 text-right">
            Missing {currency}
            {(threshold - cartAmount).toLocaleString()} for Free Shipping
          </p>
        )}
        <hr className="mt-2" />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {cartAmount === 0 ? 0 : (cartAmount + shippingFee).toLocaleString()}
            .00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
