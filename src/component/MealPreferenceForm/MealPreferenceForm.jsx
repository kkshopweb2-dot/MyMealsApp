import React, { useState, useEffect } from "react";
import axios from "axios"; // make sure to install via npm
import styles from "../../css/MealPreference.module.css";

import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import Step1UserInfo from "./Step1UserInfo";
import Step2MealDetails from "./Step2MealDetails";
import Step3Preview from "./Step3Preview";
import ThankYou from "./ThankYou";
import MealPreferenceTable from "../MealPreferenceTable"; // your table component

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

  /* === FETCH DATA FROM SERVER === */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/meal-preferences"); // replace with your API endpoint
        setSubmittedData(response.data);
      } catch (error) {
        console.error("Failed to fetch meal preferences:", error);
      }
    };
    fetchData();
  }, []);

  /* === HANDLERS === */
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
      // POST data to server
      await axios.post("/api/meal-preferences", formData); // replace with your API endpoint

      // Update local table
      setSubmittedData((prev) => [...prev, formData]);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit meal preference:", error);
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

  /* === RENDER === */
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
            {/* === SIDE-BY-SIDE FORM + TABLE WRAPPER === */}
            <div
              className={styles.formTableWrapper}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                flexWrap: "wrap", // makes it responsive on small screens
              }}
            >
              {/* === FORM CARD === */}
              <div
                className={styles.formCard}
                style={{
                  flex: 1,
                  minWidth: "300px",
                  maxWidth: "600px",
                }}
              >
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

              {/* === TABLE CARD === */}
              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  maxWidth: "100%",
                  minheight: "95vh",
                  maxHeight: "600px",
                  overflowY: "auto",
                  background: "rgba(255, 255, 255, 0.85)", // semi-transparent white
                  borderRadius: "12px",
                  padding: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(8px)", // optional: modern glass effect
                }}
              >

                <MealPreferenceTable rows={submittedData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MealPreferenceForm;
