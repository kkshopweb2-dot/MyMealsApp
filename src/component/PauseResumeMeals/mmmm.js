import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../../css/dashboard.css';
import "../../css/PauseResumeMeals.css";

import bgImage from "../../assets/images/bg.png"; 

// Map plan to available meals
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

// Initialize meal state
export const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
});

export default function PauseResumeMeals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);

  // User info
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());

  // Step handlers
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

  // Update meal checkbox / pause / resume
  const setMealField = (meal, key, value) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], [key]: value } }));
  };

  // Update meal pause/resume dates
  const setMealDate = (meal, type, date) => {
    setMeals(prev => ({
      ...prev,
      [meal]: { ...prev[meal], dates: { ...prev[meal].dates, [type]: date } }
    }));
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main content */}
      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content "
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pause-content row">
            <div className="pause-card col-md-4"></div>
            <div className="pause-card col-md-8"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
