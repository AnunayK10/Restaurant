import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Get user ID from local storage
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    debugger;
    // Retrieve cart items from local storage
    const currentCartList = JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]") || [];
    if (currentCartList.length > 0) {
      setCartItems(currentCartList);
      calculateTotal(currentCartList);
    }
  }, [userId]);

  const calculateTotal = (items) => {
    // Calculate total price of items in the cart
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateQuantity = (id, delta) => {
    // Update the quantity of items in the cart
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCartItems(filteredCart);
    calculateTotal(filteredCart);
    updateLocalStorage(filteredCart);
  };

  const updateLocalStorage = (updatedCart) => {
    debugger;
    // Update the cart in local storage
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    // Remove an item from the cart
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleOrderNow = () => {
    // Navigate to the payment page with cart items and total price
    navigate("/checkout/payment", { state: { cartItems, totalPrice, userId } });
  };

  return (
    <div className="container py-12 mx-auto bg-[#AFEEEE]">
      <h2 className="mb-8 text-2xl font-semibold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is currently empty.</div>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6">
              <img
                className="object-cover w-20 h-20 mr-4 rounded-lg"
                src={item.image}
                alt={item.foodName}
              />
              <div className="flex flex-col">
                <span className="text-lg font-medium">{item.foodName}</span>
                <span className="text-lg font-semibold"> INR {item.price}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="relative ml-4 font-medium bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-2 rounded-lg 
                    transform transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-[0_5px_15px_rgba(239,68,68,0.35)]
                    active:scale-95 active:shadow-inner
                    before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                    before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-lg
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                    after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full 
                    after:bg-white/10 after:rounded-lg after:opacity-0 
                    active:after:opacity-100 after:transition-opacity group overflow-hidden"
                >
                  <span className="relative z-10">Remove</span>
                  <div className="absolute inset-0 rounded-lg bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-full group-hover:animate-[spin_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </button>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity === 1}
                  className="px-3 py-2 bg-gray-200 rounded transform active:scale-95 active:translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:hover:shadow-none"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-2 bg-gray-200 rounded transform active:scale-95 active:translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-6 border-t">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">INR {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleOrderNow} 
              className="relative bg-[#4c0000] text-white py-3 px-6 rounded-lg
                transform transition-all duration-200 ease-out
                hover:bg-[#7e1010] hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(76,0,0,0.3)]
                active:translate-y-[1px] active:shadow-[0_5px_10px_rgba(76,0,0,0.2)]
                before:content-[''] before:absolute before:top-0 before:left-0 
                before:w-full before:h-full before:bg-white/10 
                before:rounded-lg before:opacity-0 hover:before:opacity-100 
                before:transition-opacity font-semibold text-lg
                shadow-[0_5px_15px_rgba(76,0,0,0.2)]
                border-b-4 border-[#3a0000]"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
