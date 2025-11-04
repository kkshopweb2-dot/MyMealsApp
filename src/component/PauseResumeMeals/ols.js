import React, { useState } from "react";
import "../css/PauseResumeMeals.css";
import logo from "../assets/images/logo.png";

import Step1Info from "./Step1Info";
import Step2Meals from "./Step2Meals";
import Step3Review from "./Step3Review";
import Step4ThankYou from "./Step4ThankYou";

export const planToMeals = (plan) => {
  switch (plan) {
    case "1": return ["Lunch", "Dinner"];
    case "2": return ["Breakfast", "Lunch", "Dinner"];
    case "3": return ["Lunch"];
    case "4": return ["Dinner"];
    case "5": return ["Breakfast"];
    default: return [];
  }
};

export const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
});

export default function PauseResumeMeals() {
  const [step, setStep] = useState(1);
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());

  const handleNextFromInfo = () => {
    if (!plan) return alert("Please select a plan.");
    const enabledMeals = planToMeals(plan);
    const copy = initialMealState();
    enabledMeals.forEach((m) => (copy[m].checked = true));
    setMeals(copy);
    setStep(2);
  };

  const handleSubmitMeals = () => {
    if (!Object.values(meals).some((m) => m.checked)) {
      return alert("Please select at least one meal (per your plan).");
    }
    setStep(3);
  };

  const handleFinalSubmit = () => setStep(4);

  const setMealField = (meal, key, value) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], [key]: value } }));
  };

  const setMealDate = (meal, type, date) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], dates: { ...prev[meal].dates, [type]: date } } }));
  };

  return (
    <div className="pause-container">
      <img src={logo} alt="logo" className="pause-logo" />

      {step === 1 && (
        <Step1Info
          orderNo={orderNo} setOrderNo={setOrderNo}
          name={name} setName={setName}
          phone={phone} setPhone={setPhone}
          email={email} setEmail={setEmail}
          plan={plan} setPlan={setPlan}
          handleNext={handleNextFromInfo}
        />
      )}

      {step === 2 && (
        <Step2Meals
          plan={plan} meals={meals}
          setMealField={setMealField} setMealDate={setMealDate}
          handleSubmit={handleSubmitMeals}
          handleBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Step3Review
          orderNo={orderNo} name={name} phone={phone} email={email} plan={plan} meals={meals}
          handleFinalSubmit={handleFinalSubmit}
          handleBack={() => setStep(2)}
        />
      )}

      {step === 4 && <Step4ThankYou />}
    </div>
  );
}
