import React, { useState } from "react";
import styles from "../../css/Changedeliverylocation.module.css";
import Header from "../Header";
import Sidebar from "../Sidebar";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2EffectiveDate from "./Step2EffectiveDate";
import Step3Meals from "./Step3Meals";
import Step4ChangeFor from "./Step4ChangeFor";
import Step5Address from "./Step5Address";
import Step6Preview from "./Step6Preview";
import Step7ThankYou from "./Step7ThankYou";

const DeliveryLocationTable = ({ rows }) => {
  return (
    <div className={styles.tableWrapper || ""} style={{ maxHeight: "600px", overflowY: "auto" }}>
      <table className={styles.table || ""} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ position: "sticky", top: 0, backgroundColor: "#f1f1f1", color: "#2e7d5c" }}>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Effective Date</th>
            <th>Meals</th>
            <th>Change For</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "15px" }}>

              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                <td>{row.orderNo}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.plan}</td>
                <td>{row.effectiveDate}</td>
                <td>{row.meals.join(", ")}</td>
                <td>{row.changeFor}</td>
                <td>
                  {row.addressType === "primary"
                    ? `${row.primaryAddress}, ${row.primaryCity}, ${row.primaryState}, ${row.primaryZip}`
                    : `${row.secondaryAddress}, ${row.secondaryCity}, ${row.secondaryState}, ${row.secondaryZip}`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const Changedeliverylocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    effectiveDate: "",
    meals: [],
    changeFor: "",
    addressType: "",
    primaryAddress: "",
    primaryCity: "",
    primaryLandmark: "",
    primaryState: "",
    primaryZip: "",
    secondaryAddress: "",
    secondaryCity: "",
    secondaryLandmark: "",
    secondaryState: "",
    secondaryZip: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "meals") {
      setFormData((prev) => {
        const meals = checked
          ? [...prev.meals, value]
          : prev.meals.filter((m) => m !== value);
        return { ...prev, meals };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmittedData((prev) => [...prev, formData]);
    setStep(7);
  };

  const handleNewSubmission = () => {
    setFormData({
      orderNo: "",
      name: "",
      email: "",
      phone: "",
      plan: "",
      effectiveDate: "",
      meals: [],
      changeFor: "",
      addressType: "",
      primaryAddress: "",
      primaryCity: "",
      primaryLandmark: "",
      primaryState: "",
      primaryZip: "",
      secondaryAddress: "",
      secondaryCity: "",
      secondaryLandmark: "",
      secondaryState: "",
      secondaryZip: "",
    });
    setStep(1);
  };

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
            <div
              className={styles.formTableWrapper}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* FORM CARD */}
              <div
                className={styles.formContainer}
                style={{ flex: 1, minWidth: "300px", maxWidth: "600px" }}
              >
                {step === 1 && (
                  <Step1BasicInfo
                    formData={formData}
                    handleChange={handleChange}
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                    nextStep={nextStep}
                  />
                )}
                {step === 2 && (
                  <Step2EffectiveDate
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                {step === 3 && (
                  <Step3Meals
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                {step === 4 && (
                  <Step4ChangeFor
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                {step === 5 && (
                  <Step5Address
                    formData={formData}
                    handleChange={handleChange}
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
                {step === 6 && (
                  <Step6Preview
                    formData={formData}
                    handleSubmit={handleSubmit}
                    prevStep={prevStep}
                  />
                )}
                {step === 7 && (
                  <Step7ThankYou handleNewSubmission={handleNewSubmission} />
                )}
              </div>

              {/* TABLE CARD */}
              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  maxWidth: "800px",
                  maxHeight: "600px",
                  overflowY: "auto",
                  background: "rgba(255, 255, 255, 0.85)", // semi-transparent white
                  borderRadius: "12px",
                  padding: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(8px)", // optional glass effect
                }}
              >

                <DeliveryLocationTable rows={submittedData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Changedeliverylocation;
