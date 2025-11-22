import React from "react";
import { IoMailOutline } from "react-icons/io5";

const UpdateForm = ({ formData, setFormData, setStep, handleSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { orderNo, name, email, plan, oldPhone, newPhone } = formData;
    if (!orderNo || !name || !email || !plan || !oldPhone || !newPhone) {
      alert("Please fill all required fields");
      return;
    }
    handleSubmit(formData);
    setStep("thankyou");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="update-heading">Update Contact No.</h2>

      <label className="update-label">Order No. *</label>
      <input
        type="number"
        className="update-input"
        value={formData.orderNo}
        onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
        placeholder="Enter your order number"
      />

      <label className="update-label">Name *</label>
      <input
        type="text"
        className="update-input"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter your name"
      />

      <label className="update-label">Email *</label>
      <div className="update-input-with-icon">
        <IoMailOutline className="update-icon" />
        <input
          type="email"
          className="update-input-inner"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />
      </div>

      <label className="update-label">Plan *</label>
      <select
        className="update-select"
        value={formData.plan}
        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
      >
        <option value="">Select Plan</option>
        <option value="Combo">Combo Lunch & Dinner</option>
        <option value="Lunch">Lunch Only</option>
        <option value="Breakfast">Breakfast Only</option>
        <option value="Dinner">Dinner Only</option>
        <option value="All">Combo Lunch, Dinner & Breakfast</option>
      </select>

      <label className="update-label">Old Phone No. *</label>
      <input
        type="tel"
        className="update-input"
        value={formData.oldPhone}
        onChange={(e) => setFormData({ ...formData, oldPhone: e.target.value })}
        placeholder="+91 00000 00000"
      />

      <label className="update-label">New Phone No. *</label>
      <input
        type="tel"
        className="update-input"
        value={formData.newPhone}
        onChange={(e) => setFormData({ ...formData, newPhone: e.target.value })}
        placeholder="+91 00000 00000"
      />

      <button type="submit" className="update-submit-btn">
        Submit
      </button>
    </form>
  );
};

export default UpdateForm;
