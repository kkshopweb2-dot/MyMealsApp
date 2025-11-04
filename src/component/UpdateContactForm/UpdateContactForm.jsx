import React, { useState } from "react";
import "../../css/UpdateContactForm.css";
import Header from "../Header";
import Sidebar from "../Sidebar";

import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import UpdateForm from "./UpdateForm";
import ThankYouMessage from "./ThankYouMessage";

const UpdateContactForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState("form");

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    plan: "",
    oldPhone: "",
    newPhone: "",
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
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
            <div className="update-card">
              {step === "form" ? (
                <UpdateForm
                  formData={formData}
                  setFormData={setFormData}
                  setStep={setStep}
                />
              ) : (
                <ThankYouMessage />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateContactForm;
