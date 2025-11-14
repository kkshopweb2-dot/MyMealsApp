import React, { useState } from "react";
import "../../css/UpdateContactForm.css";
import "../../css/dashboard.css";

import Header from "../Header";
import Sidebar from "../Sidebar";
import UpdateForm from "./UpdateForm";
import ThankYouMessage from "./ThankYouMessage";
import UpdateContactTable from "../UpdateContactTable";

import bgImage from "../../assets/images/bg.png";

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
          <div className="update-page-container">

            {/* Flex layout for form + table */}
            <div className="update-flex-container">

              {/* Left Side - Form */}
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

              {/* Right Side - Table */}
              <div
                className="update-table-wrapper"
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                }}
              >
                <UpdateContactTable formData={formData} />
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateContactForm;
