import React from "react";
import { IoArrowForward } from "react-icons/io5";

const OrderDetailsForm = ({ orderData, setOrderData, setStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    const { orderNo, name, phone, address, city, state, plan } = orderData;
    if (!orderNo || !name || !phone || !address || !city || !state || !plan) {
      alert("Please fill all required fields");
      return;
    }
    setStep("complaint");
  };

  return (
    <form onSubmit={handleNext}>
      

      {[
        { label: "Order No *", key: "orderNo" },
        { label: "Name *", key: "name" },
        { label: "Phone *", key: "phone" },
        { label: "Address *", key: "address" },
        { label: "City *", key: "city" },
        { label: "State *", key: "state" },
        { label: "ZIP", key: "zip" },
      ].map((field) => (
        <div key={field.key} className="form-group">
          <label>{field.label}</label>
          <input
            type="text"
            value={orderData[field.key]}
            onChange={(e) =>
              setOrderData({ ...orderData, [field.key]: e.target.value })
            }
          />
        </div>
      ))}

      <label>Plan *</label>
      <select
        value={orderData.plan}
        onChange={(e) => setOrderData({ ...orderData, plan: e.target.value })}
      >
        <option value="">Select Plan</option>
        <option value="Combo Lunch & Dinner">Combo Lunch & Dinner</option>
        <option value="Lunch">Lunch Only</option>
        <option value="Dinner">Dinner Only</option>
        <option value="Breakfast">Breakfast Only</option>
        <option value="Combo Lunch,Breakfast & Dinner">
          Combo Lunch, Breakfast & Dinner
        </option>
      </select>

      <button type="submit" className="btn">
        Next <IoArrowForward className="icon-inline" />
      </button>
    </form>
  );
};

export default OrderDetailsForm;
