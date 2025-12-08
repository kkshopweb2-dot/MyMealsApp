import React, { useState, useRef } from "react";
import axios from "../../api/axios";
import styles from "../../css/MealPreference.module.css";

import Step1UserInfo from "./Step1UserInfo";
import Step2MealDetails from "./Step2MealDetails";
import Step3Preview from "./Step3Preview";
import ThankYou from "./ThankYou";
import MealPreferenceTable from "../MealPreferenceTable";

const MealPreferenceForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const tableRef = useRef(null);

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
        name: formData.name,
        email: formData.email,
        plan: formData.plan,
        effective_from: formData.effectiveFrom,
        meal_type: formData.mealType,
        preference_details: JSON.stringify({
          dishChoice: formData.dishChoice,
          avoidNonVeg: formData.avoidNonVeg,
          avoidVeg: formData.avoidVeg,
        }),
        is_active: true,
      };

      await axios.post("/meal-preferences", requestData);

      window.alert("Meal preference submitted successfully!");
      setSubmitted(true);

      if (tableRef.current) {
        tableRef.current.fetchMealPreferences();
      }
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
            ref={tableRef}
            title="Meal Preference History"
          />
        </div>
      </div>
    </div>
  );
};

export default MealPreferenceForm;
