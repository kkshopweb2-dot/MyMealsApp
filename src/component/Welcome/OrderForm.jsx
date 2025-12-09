import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axios"; // your Axios instance
import "../../css/MyMealsOrderForm.css";
import PaymentOptions from "./payment/PaymentOptions";
import QRPaymentForm from "./payment/QRPaymentForm";
import PayCashForm from "./payment/PayCashForm";


// --- Reusable Input ---
function InputGroup({ label, type = "text", value, name, onChange, placeholder, isTextarea }) {
  return (
    <div className="mymeals-input-group">
      <label>{label}</label>
      {isTextarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} />
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
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            deliveryAddress || ""
          )}&output=embed`}
          allowFullScreen
        />
      ) : (
        <p className="mymeals-map-placeholder">🗺️ Enter delivery address to preview map</p>
      )}
    </div>
  );
}


// --- Main OrderForm Component ---
export default function OrderForm({ bg, plan, setPlan, onSuccess }) {

  // --- Payment States ---
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [payByQR, setPayByQR] = useState(false);
  const [payByCash, setPayByCash] = useState(false);
  const [plans, setPlans] = useState([]);
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  // ✅ Use a ref so FormData persists across renders
  const formDataRef = useRef(new FormData());

  // --- Update FormData dynamically ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current.set(name, value); // Text / select input
    // if (files && files.length > 0) {
    //   formDataRef.current.set(name, files[0]); // File input
    // } else {
    // } 
    // console.log("Updated FormData:", name, formDataRef.current.get(name));
  };

  const setplanid = (e) => {
    setPlan(e.target.value);
    formDataRef.current.set("amount", e.target.selectedOptions[0].dataset.id);
  }

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
    // Convert FormData to plain object for logging
    const formData = Object.fromEntries(formDataRef.current);
    console.log("Order Form Data:", formData,
      primaryAddress,
      secondaryAddress,
      plan,
      payByCash,
      payByQR); // Logs to console
      const paymentMethod = (payByCash)?'Cash':'QR';
    try {
      // Build plain object from FormData
      const payload = {
        ...formData,
        primaryAddress,
        secondaryAddress,
        plan,
        paymentMethod,
      };

      // Append any file fields if they exist
      const screenshot = formDataRef.current.get("screenshot");
      if (screenshot && screenshot instanceof File && screenshot.size > 0) {
        const response = await axios.post("/orders", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Server response:", response.data);
      } else {
        const response = await axios.post("/orders", payload);
        console.log("Server response:", response.data);
      }

      onSuccess(); // Move to Success page
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Failed to submit order. Please try again.");
    }
  };

  // useEffect to render axios once.
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get("/meals/plansList");
      setPlans(response.data);
      console.log("real plan", response.data);
    };
    fetchPlans();
  }, []);

  return (
    <div className="mymeals-page-bg" style={{ backgroundImage: `url(${bg})` }}>
      <div className="mymeals-form-card">
        <h1 className="mymeals-form-title">MyMeals Order Form</h1>
        <InputGroup label="Name *" name="name" onChange={handleChange} />
        <InputGroup label="Phone *" name="phone" onChange={handleChange} />
        <InputGroup label="Email" name="email" onChange={handleChange} />
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
          name="deliveryTime"
          type="time"
          onChange={handleChange}
        />
        {/* <PlanSelector handleChange={handleChange} /> */}
        <div className="mymeals-input-group">
          <label>Select Plan *</label>
          <select value={plan} onChange={setplanid}>
            <option value="">Select Plan</option>
            <option value="Combo lunch and breakfast">Combo lunch and breakfast</option>
            <option value="Combo lunch,dinner and breakfast">Combo lunch,dinner and breakfast</option>
            <option value="Monthly lunch">Monthly lunch</option>
            <option value="Monthly breakfast">Monthly breakfast</option>
            <option value="Monthly dinner">Monthly dinner</option>
            <option value="Combo lunch and dinner">Combo lunch and dinner</option>
            {plans.map((p) => (
              <option key={p.p_id} data-id={p.p_price} value={p.p_id}>{p.p_name}</option>
            ))}
          </select>
        </div>
        {!showPaymentOptions && (
          <button className="mymeals-btn" onClick={handleProceed}>
            Proceed to Payment
          </button>
        )}

        {showPaymentOptions && (
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
            formDataRef={formDataRef}
            handleChange={handleChange}
            onSubmit={handleSubmitOrder} // ← Submit consolidated form
          />
        )}

        {selectedPayment && payByCash && (
          <PayCashForm
            formDataRef={formDataRef}
            handleChange={handleChange}
            onSubmit={handleSubmitOrder} />
        )}
      </div>
    </div>
  );
}
