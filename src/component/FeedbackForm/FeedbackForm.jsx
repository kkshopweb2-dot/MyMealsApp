import React, { useState } from "react";
import "../../css/FeedbackForm.css";
import Header from "../Header";
import Sidebar from "../Sidebar";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import FeedbackInputs from "./FeedbackInputs";
import FeedbackSection from "./FeedbackSection";
import OverallFeedback from "./OverallFeedback";
import ThankYou from "./ThankYou";

import FeedbackTable from "../FeedbackTable";

const FeedbackForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Added
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    phoneNumber: "",
    plan: "",
    feedbackText: "",
    selectedDate: "",
  });

  const [errors, setErrors] = useState({});
  const [ratings, setRatings] = useState({
    food: { rating: "", feedback: "" },
    delivery: { rating: "", feedback: "" },
    management: { rating: "", feedback: "" },
  });

  const plans = [
    { label: "Combo Lunch and Dinner", value: "combo_lunch_dinner" },
    { label: "Combo Lunch, Dinner & Breakfast", value: "combo_all" },
    { label: "Monthly Lunch", value: "monthly_lunch" },
    { label: "Monthly Dinner", value: "monthly_dinner" },
    { label: "Monthly Breakfast", value: "monthly_breakfast" },
  ];

  const ratingOptions = ["Excellent", "Good", "Average", "Poor"];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.orderNo.trim()) newErrors.orderNo = "Order number is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.plan) newErrors.plan = "Please select a plan";
    if (!formData.feedbackText.trim()) newErrors.feedbackText = "Please provide overall feedback";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitted(true);

    // Reset form after showing thank you (optional)
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        orderNo: "",
        name: "",
        phoneNumber: "",
        plan: "",
        feedbackText: "",
        selectedDate: "",
      });
      setRatings({
        food: { rating: "", feedback: "" },
        delivery: { rating: "", feedback: "" },
        management: { rating: "", feedback: "" },
      });
    }, 3000);
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="empty-dashboard">
            <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
              <div className="feedback-wrapper">
                <div className="feedback-card">
                  <h2 className="title">Customer Feedback Form</h2>
                  <form onSubmit={handleSubmit}>
                    <FeedbackInputs
                      formData={formData}
                      handleChange={handleChange}
                      errors={errors}
                      plans={plans}
                    />

                    {["Food", "Delivery", "Management"].map((section) => (
                      <FeedbackSection
                        key={section}
                        section={section}
                        ratings={ratings}
                        setRatings={setRatings}
                        ratingOptions={ratingOptions}
                      />
                    ))}

                    <OverallFeedback
                      formData={formData}
                      handleChange={handleChange}
                      errors={errors}
                    />

                    <button type="submit" className="submitButton">
                      Submit Feedback
                    </button>
                  </form>
                </div>
              </div>
              <div className="feedback-table-container">
                <FeedbackTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeedbackForm;
