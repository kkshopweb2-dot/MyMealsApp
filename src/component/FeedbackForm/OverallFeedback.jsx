import React from "react";

const OverallFeedback = ({ formData, handleChange, errors }) => (
  <>
    <label className="label">Overall Feedback*</label>
    <textarea
      className="textArea"
      placeholder="Type your overall view..."
      value={formData.feedbackText}
      onChange={(e) => handleChange("feedbackText", e.target.value)}
    />
    {errors.feedbackText && <p className="errorText">{errors.feedbackText}</p>}

    <label className="label">Date (Optional)</label>
    <input
      type="date"
      className="input"
      value={formData.selectedDate}
      onChange={(e) => handleChange("selectedDate", e.target.value)}
    />
  </>
);

export default OverallFeedback;
