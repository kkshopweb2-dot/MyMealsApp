import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/MealPreference.module.css";

import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

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

  // === FETCH DATA FROM SERVER WITH CONSOLE LOG ===
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/meal-preferences");

      console.log("✅ Fetched Meal Preferences Data:", response.data); // CONSOLE OUTPUT

      setSubmittedData(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch meal preferences:", error);
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

      const response = await axios.post("/api/meal-preferences", requestData);

      console.log("✅ Submitted Meal Preference Response:", response.data); // POST LOG

      fetchData();
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Failed to submit meal preference:", error);
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

  return (
    <div className="container-fluid">
      <div className="row">
        {/* FORM CARD */}
        <div className="col-md-4">
          <div className={styles.formCard}>
            {!submitted ? (
              <>
                <h2 className={styles.title}>
                  Change Your Meal Preference
                </h2>

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
            rows={submittedData}
            title="Meal Preference History"
          />
        </div>
      </div>
    </div>
  );
};

export default MealPreferenceForm;
