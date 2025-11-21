import React from "react";

const ComplaintForm = ({ complaintData, setComplaintData, setStep }) => {
  const toggleComplaintType = (type) => {
    setComplaintData((prev) => ({
      ...prev,
      complaint: prev.complaint.includes(type)
        ? prev.complaint.filter((t) => t !== type)
        : [...prev.complaint, type],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComplaintData({ ...complaintData, imageUri: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaintData.complaint.length || !complaintData.issue) {
      alert("Please complete all required fields");
      return;
    }
    setStep("thankyou");
  };

  return (
    <form onSubmit={handleSubmit}>
     

      <label>Complaint Type *</label>
      <div className="checkbox-group">
        {["Food", "Delivery", "Management", "Other"].map((item) => (
          <div
            key={item}
            className={`checkbox ${
              complaintData.complaint.includes(item) ? "selected" : ""
            }`}
            onClick={() => toggleComplaintType(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <label>Date</label>
      <input
        type="date"
        value={complaintData.date.toISOString().split("T")[0]}
        onChange={(e) =>
          setComplaintData({
            ...complaintData,
            date: new Date(e.target.value),
          })
        }
      />

      <label>Meal *</label>
      <select
        value={complaintData.meal}
        onChange={(e) =>
          setComplaintData({ ...complaintData, meal: e.target.value })
        }
      >
        <option value="">Select Meal</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>

      <label>Issue *</label>
      <textarea
        placeholder="Describe your issue"
        value={complaintData.issue}
        onChange={(e) =>
          setComplaintData({ ...complaintData, issue: e.target.value })
        }
      ></textarea>

      <label>Upload Image (optional)</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {complaintData.imageUri && (
        <img
          src={complaintData.imageUri}
          alt="Complaint"
          className="preview-image"
        />
      )}

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;
