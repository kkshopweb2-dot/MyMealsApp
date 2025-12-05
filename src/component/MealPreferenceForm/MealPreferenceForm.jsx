import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "../../css/MealPreference.module.css";

import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../css/dashboard.css";

import Step1UserInfo from "./Step1UserInfo";
import Step2MealDetails from "./Step2MealDetails";
import Step3Preview from "./Step3Preview";
import ThankYou from "./ThankYou";
import MealPreferenceTable from "../MealPreferenceTable";

const MealPreferenceForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const [toggles, setToggles] = useState({
    vegNonveg: false,
    lunch: false,
    dinner: false,
    dishChoice: false,
  });

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    effectiveFrom: "",
    mealType: "",
    avoidNonVeg: "",
    avoidVeg: "",
    dishChoice: "",
  });

  // === FETCH DATA FROM SERVER ===
  const fetchData = async () => {
    try {
      // Request all records from the backend
      const response = await axios.get("/meal-preferences?limit=-1"); 

      // The backend now returns an object with a 'data' property
      const dataArray = (response.data.data || []).map(item => ({
        orderNo: item.order_no,
        mealType: item.meal_type,
        preference_details: item.preference_details, // This is already a string
        name: item.name,
        email: item.email,
        plan: item.plan,
        effectiveFrom: item.effectiveFrom ? new Date(item.effectiveFrom).toLocaleDateString() : "",
        isCurrent: false, // Historical data is not current
      }));
      setSubmittedData(dataArray);

      console.log("Fetched all meal preferences:", dataArray);

    } catch (error) {
      console.error("❌ Failed to fetch meal preferences:", error);
      setSubmittedData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === HANDLERS ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSwitch = (name) =>
    setToggles((prev) => ({ ...prev, [name]: !prev[name] }));

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalConfirm = async () => {
    try {
      const requestData = {
        order_no: formData.orderNo,
        meal_type: formData.mealType,
        preference_details: JSON.stringify({
          dishChoice: formData.dishChoice,
          avoidNonVeg: formData.avoidNonVeg,
          avoidVeg: formData.avoidVeg,
        }),
        is_active: true,
      };

      const response = await axios.post("/meal-preferences", requestData);

      console.log("Submitted:", response.data);
      window.alert("Meal preference submitted successfully!");

      // Add new submission to table, previous data stays
      const newSubmission = {
        ...formData,
        preference_details: requestData.preference_details,
      };
      setSubmittedData((prev) => [...prev, newSubmission]);
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Failed to submit meal preference:", error);
      window.alert("Failed to submit meal preference. Please try again.");
    }
  };

  const handleNewSubmission = () => {
    setSubmitted(false);
    setFormData({
      orderNo: "",
      name: "",
      email: "",
      phone: "",
      plan: "",
      effectiveFrom: "",
      mealType: "",
      avoidNonVeg: "",
      avoidVeg: "",
      dishChoice: "",
    });
    setStep(1);
  };

  // === COMBINE PREVIOUS + CURRENT RECORD (ALWAYS DISPLAY) ===
  const combinedRows = [
    ...submittedData,
    {
      ...formData,
      preference_details: JSON.stringify({
        dishChoice: formData.dishChoice,
        avoidNonVeg: formData.avoidNonVeg,
        avoidVeg: formData.avoidVeg,
      }),
      isCurrent: !submitted, // mark as current if not submitted
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* FORM CARD */}
        <div className="col-md-4">
          <div className={styles.formCard}>
            {!submitted ? (
              <>
                <h2 className={styles.title}>Change Your Meal Preference</h2>

                {step === 1 && (
                  <Step1UserInfo
                    formData={formData}
                    handleChange={handleChange}
                    handleNext={handleNext}
                  />
                )}

                {step === 2 && (
                  <Step2MealDetails
                    formData={formData}
                    toggles={toggles}
                    handleChange={handleChange}
                    toggleSwitch={toggleSwitch}
                    handleFinalSubmit={handleFinalSubmit}
                    setStep={setStep}
                  />
                )}

                {step === 3 && (
                  <Step3Preview
                    formData={formData}
                    toggles={toggles}
                    handleFinalConfirm={handleFinalConfirm}
                    setStep={setStep}
                  />
                )}
              </>
            ) : (
              <ThankYou handleNewSubmission={handleNewSubmission} />
            )}
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="col-md-7">
          <MealPreferenceTable
            rows={combinedRows}
            title="Meal Preference History"
          />
        </div>
      </div>
    </div>
  );
};

export default MealPreferenceForm;
