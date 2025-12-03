import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

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

  const fetchFeedback = useCallback(async (query = "") => {
    try {
      const url = query ? `/feedbacks/search?keyword=${query}` : "/feedbacks";
      const res = await axios.get(url);
      console.log("Fetched feedback:", res.data);
      const formattedData = res.data.map((item) => ({
        orderNo: item.order_no,
        name: item.customer_name,
        phone: item.phone_number,
        plan: item.plan_name,
        food: item.food_rating,
        delivery: item.delivery_rating,
        management: item.management_rating,
        feedback: item.overall_comments,
        date: new Date(item.created_at).toLocaleDateString(),
      }));
      setFeedbackList(formattedData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleSearch = (query) => {
    fetchFeedback(query);
  };

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
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.plan) newErrors.plan = "Please select a plan";
    if (!formData.feedbackText.trim())
      newErrors.feedbackText = "Please provide overall feedback";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const payload = {
      orderNo: formData.orderNo,
      customer_name: formData.name,
      phone_number: formData.phoneNumber,
      plan_name: formData.plan,
      overall_comments: formData.feedbackText,
      selected_date: formData.selectedDate,
      food_rating: ratings.food.rating,
      food_comments: ratings.food.feedback,
      delivery_rating: ratings.delivery.rating,
      delivery_comments: ratings.delivery.feedback,
      management_rating: ratings.management.rating,
      management_comments: ratings.management.feedback,
    };

    console.log("Sending feedback:", payload);

    try {
      const response = await axios.post("/feedbacks", payload);
      console.log("Backend response:", response.data);

      setIsSubmitted(true);

      fetchFeedback(); // Refresh the list

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
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <main>
      <div className="empty-dashboard">
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <div className="feedback-wrapper">
            <div className="feedback-card">
              {isSubmitted ? (
                <ThankYou />
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="feedback-table-container">
            <FeedbackTable data={feedbackList} onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedbackForm;
