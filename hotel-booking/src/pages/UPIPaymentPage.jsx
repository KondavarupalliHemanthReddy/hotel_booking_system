import "./payment.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function UPIPaymentPage() {
  const { state: booking } = useLocation();
  const navigate = useNavigate();

   const nights =
  (new Date(booking.checkOut) - new Date(booking.checkIn)) /
  (1000 * 60 * 60 * 24);
  console.log(booking.hotelPrice,'--------------')

const totalAmount = booking.hotelPrice * nights;// later you can calculate from nights * price

  const handlePay = async () => {
    alert("Payment successful");

    await fetch("https://hotel-booking-system-vq5g.onrender.com/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });

    navigate("/confirmation", { state: booking });
  };

  if (!booking) {
    return <h3>Invalid payment request</h3>;
  }

  return (
    <div className="page">
      <div className="payment-card">

        <h2 className="title">Complete Payment</h2>
        <p className="subtitle">Pay securely using UPI</p>

        <div className="amount-box">
          <span>Amount</span>
          <strong>₹{totalAmount}</strong>
        </div>

        <p className="section-title">Pay using app</p>

        <div className="upi-apps">
          <button onClick={handlePay}>Google Pay</button>
          <button onClick={handlePay}>PhonePe</button>
          <button onClick={handlePay}>Paytm</button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <label className="label">Enter UPI ID</label>
        <input
          type="text"
          placeholder="example@upi"
          className="upi-input"
        />

        <button className="pay-btn" onClick={handlePay}>
          Pay ₹{totalAmount}
        </button>

        <p className="footer-text">
          Secured by UPI • Safe & Trusted Payments
        </p>

      </div>
    </div>
  );
}
