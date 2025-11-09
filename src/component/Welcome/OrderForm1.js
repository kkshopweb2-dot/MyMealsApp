import React, { useState } from "react";
import axios from "../../api/axios"; // your Axios instance
import "../../css/MyMealsOrderForm.css";
import PaymentOptions from "./payment/PaymentOptions";
import QRPaymentForm from "./payment/QRPaymentForm";
import PayCashForm from "./payment/PayCashForm";

// --- Reusable Input ---
function InputGroup({ label, type = "text", value, onChange, placeholder, isTextarea }) {
  return (
    <div className="mymeals-input-group">
      <label>{label}</label>
      {isTextarea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

// --- Map preview for addresses ---
function MapPreview({ deliveryAddress }) {
  return (
    <div className={`mymeals-map-container ${deliveryAddress ? "active" : ""}`}>
      {deliveryAddress ? (
        <iframe
          title="Delivery Location"
          frameBorder="0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(deliveryAddress)}&output=embed`}
          allowFullScreen
        />
      ) : (
        <p className="mymeals-map-placeholder">🗺️ Enter delivery address to preview map</p>
      )}
    </div>
  );
}

// --- Plan selector ---
function PlanSelector({ plan, setPlan, plans }) {
  return (
    <div className="mymeals-input-group">
      <label>Select Plan *</label>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="">Select Plan</option>
        {plans.map((p) => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}

// --- Main OrderForm Component ---
export default function OrderForm({ bg, plan, setPlan, onSuccess }) {
  // --- Basic Info States ---
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  // --- Payment States ---
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [payByQR, setPayByQR] = useState(false);
  const [payByCash, setPayByCash] = useState(false);

  // --- QR Payment States ---
  const [amount, setAmount] = useState("2100");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  // --- Example Plans (can come from props / API) ---
  const plansList = [
    { id: 1, name: "combo-lunch-dinner" },
    { id: 2, name: "monthly-lunch" },
    { id: 3, name: "monthly-dinner" },
    { id: 4, name: "combo-all" },
  ];

  // --- Proceed to payment ---
  const handleProceed = () => {
    if (!plan) {
      alert("Please select a plan to continue.");
      return;
    }
    setShowPaymentOptions(true);
  };

  // --- Select payment method ---
  const handleNext = () => {
    if (payByQR || payByCash) setSelectedPayment(true);
    else alert("Please select a payment method.");
  };

  // --- Submit entire form ---
  const handleSubmitOrder = async () => {
    const formData = {
      name,
      phone,
      email,
      primaryAddress,
      secondaryAddress,
      deliveryTime,
      plan,
      paymentMethod: payByQR ? "QR" : payByCash ? "Cash" : null,
      qrDetails: payByQR
        ? { amount, transactionId, note, screenshot }
        : null,
        cashDetails: payByCash
        ? { amount }
        : null,
    };

    console.log("Order Form Data:", formData); // Logs to console

    try {
      const response = await axios.post("/orders", formData);
      console.log("Server response:", response.data);
      onSuccess(); // Move to Success page
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="mymeals-page-bg" style={{ backgroundImage: `url(${bg})` }}>
      <div className="mymeals-form-card">
        <h1 className="mymeals-form-title">MyMeals Order Form</h1>

        <InputGroup label="Name *" value={name} onChange={(e) => setName(e.target.value)} />
        <InputGroup label="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <InputGroup label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputGroup
          label="Primary Address *"
          isTextarea
          value={primaryAddress}
          onChange={(e) => setPrimaryAddress(e.target.value)}
        />
        <MapPreview deliveryAddress={primaryAddress} />
        <InputGroup
          label="Secondary Address"
          isTextarea
          value={secondaryAddress}
          onChange={(e) => setSecondaryAddress(e.target.value)}
        />
        <MapPreview deliveryAddress={secondaryAddress} />
        <InputGroup
          label="Delivery Time"
          type="time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
        <PlanSelector plan={plan} setPlan={setPlan} plans={plansList} />

        {!showPaymentOptions && (
          <button className="mymeals-btn" onClick={handleProceed}>
            Proceed to Payment
          </button>
        )}

        {showPaymentOptions && !selectedPayment && (
          <PaymentOptions
            payByQR={payByQR}
            setPayByQR={setPayByQR}
            payByCash={payByCash}
            setPayByCash={setPayByCash}
            onNext={handleNext}
          />
        )}

        {selectedPayment && payByQR && (
          <QRPaymentForm
            amount={amount}
            setAmount={setAmount}
            planName={plan}
            setPlanName={setPlan}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
            note={note}
            setNote={setNote}
            screenshot={screenshot}
            setScreenshot={setScreenshot}
            onSubmit={handleSubmitOrder} // ← Submit consolidated form
          />
        )}

        {selectedPayment && payByCash && (
          <PayCashForm onSubmit={handleSubmitOrder} />
        )}
      </div>
    </div>
  );
}
