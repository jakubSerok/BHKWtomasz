import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import remoe_icon from "../../assets/admin/cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="my-[100px] mx-[170px]">
      <div className="grid grid-cols-6 items-center gap-[75px] py-[20px] text-[#454545] text-[18px] font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quatity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="h-[3px] bg-[#e2e2e2]" />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="grid grid-cols-6 items-center gap-[75px] py-[20px] text-[#454545] text-[17px] font-medium">
                <img src={e.images} className="h-[62px]" alt="" />
                <p>{e.title}</p>
                <p>${e.price}</p>
                <button className="w-[64px] h-[50px] border-[#ebebeb] border-2 bg-[#fff]">
                  {cartItems[e.id]}
                </button>
                <p>${e.price * cartItems[e.id]}</p>
                <img
                  src={remoe_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  className="w-[15px] mx-[40px] cursor-pointer"
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="flex my-[100px]">
        <div className="flex flex-1 flex-col mr-[200px] gap-[40px]">
          <h1>Cart Totals</h1>
          <div>
            <div className="flex justify-between py-[15px]">
              <p>Subtatal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between py-[15px]">
              <p>Shiping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-[15px]">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="w-[262px] h-[58px] bg-[#ff5a5a] text-white font-semibold text-[16px] cursor-pointer">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
