import React from "react";

export default function InputGroup({ label, type = "text", value, onChange, placeholder, isTextarea }) {
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
