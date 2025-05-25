import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import paybg from "../assets/paybg.jpg";

const PayNow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const currentUser = useSelector((state) => state.user.currentUser); // Get currentUser from Redux store

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  const generateTokenNumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const handlePayment = async (e) => {
    debugger;
    e.preventDefault();
    const tokenNumber = generateTokenNumber();

    // Check if userId is available
    const userId = currentUser?._id; // Retrieve userId from currentUser

    // Ensure userId is valid before proceeding
    if (!userId) {
      // alert("User ID is not available. Please log in.");
      Toastify({
        text: "User ID is not available. Please log in.",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      return;
    }

    const paymentDetails = {
      userId,
      cartItems,
      totalPrice,
      paymentInfo: {
        cardType: e.target.cardType.value,
        cardName: e.target.cardName.value,
        cardNumber: e.target.cardNumber.value,
        expirationDate: `${e.target.expirationMonth.value}/${e.target.expirationYear.value}`,
        securityCode: e.target.securityCode.value,
      },
      tokenNumber,
    };

    try {
      const response = await fetch("/api/payment/savepayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {        
        localStorage.removeItem(`cart_${userId}`);
        Toastify({
          text: "Payment successful!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
        // alert("Payment successful!");
        const result = await response.json();
        // Redirect to PaymentReceipt page with payment details
        navigate("/payment-receipt", { state: { paymentDetails: result.payment, tokenNumber } });
      } else {
        console.error("Payment failed");
        Toastify({
          text: "Payment failed. Please try again.",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
        // alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed", error);
      Toastify({
        text: "An error occurred. Please try again.",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      // alert("An error occurred. Please try again.");
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen px-5 pt-16 pb-10 min-w-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${paybg})`,
        backgroundColor: 'rgba(166, 123, 91, 0.9)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full p-8 mx-auto rounded-lg shadow-2xl backdrop-blur-md bg-white/30" style={{ maxWidth: "600px" }}>
        <h1 className="text-3xl font-bold text-center uppercase text-black mb-6">Secure payment info</h1>
        <p className="my-4 text-lg font-semibold text-center text-black">Total Price: INR {totalPrice.toFixed(2)}</p>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="mb-3">
            <label className="mb-2 text-base font-bold text-black">Card Type</label>
            <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" name="cardType" required>
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="American Express">American Express</option>
              <option value="RuPay">RuPay</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="mb-2 text-base font-bold text-black">Name on card</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" type="text" name="cardName" required />
          </div>
          <div className="mb-3">
            <label className="mb-2 text-base font-bold text-black">Card number</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" type="text" name="cardNumber" required maxLength="16" pattern="\d{16}" />
          </div>
          <div className="flex mb-3">
            <div className="w-1/2 pr-2">
              <label className="mb-2 text-base font-bold text-black">Expiration Month</label>
              <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" name="expirationMonth" required>
                <option value="">Month</option>
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
            <div className="w-1/2 pl-2">
              <label className="mb-2 text-base font-bold text-black">Expiration Year</label>
              <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" name="expirationYear" required>
                <option value="">Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-2 text-base font-bold text-black">Security Code</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200" type="text" name="securityCode" required maxLength="3" pattern="\d{3}" />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 mt-4 font-bold text-white rounded-lg 
            bg-blue-500 hover:bg-blue-600
            shadow-[0_8px_0_0_#1d4ed8,0_15px_20px_-3px_rgba(0,0,0,0.3)]
            active:translate-y-2 active:shadow-[0_6px_0_0_#1d4ed8,0_10px_15px_-3px_rgba(0,0,0,0.3)]
            transition-all duration-150 ease-in-out
            border-b-4 border-blue-700
            focus:outline-none"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayNow;
