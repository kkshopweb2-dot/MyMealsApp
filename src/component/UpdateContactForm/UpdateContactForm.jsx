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
  const [submittedData, setSubmittedData] = useState([]);

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    plan: "",
    oldPhone: "",
    newPhone: "",
  });

  const handleSubmit = (data) => {
    setSubmittedData((prev) => [...prev, data]);
    setStep("thankyou");
  };

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
                  {/* Flex layout for form + table */}
                  <div className="update-flex-container">
        
                    {/* Left Side - Form */}
                    <div className="update-card">
                      {step === "form" ? (
                        <UpdateForm
                          formData={formData}
                          setFormData={setFormData}
                          setStep={setStep}
                          handleSubmit={handleSubmit}
                        />
                      ) : (
                        <ThankYouMessage />
                      )}
                    </div>
        
                                {/* Right Side - Table */}
                                <UpdateContactTable rows={submittedData} title="Contact Update History" />        
                  </div>
                </main>      </div>
    </div>
  );
};

export default UpdateContactForm;
