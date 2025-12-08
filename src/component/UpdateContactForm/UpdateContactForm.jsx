import React, { useState, useRef } from "react";
import axios from "../../api/axios";
import "../../css/UpdateContactForm.css";
import "../../css/dashboard.css";

import UpdateForm from "./UpdateForm";
import ThankYouMessage from "./ThankYouMessage";
import UpdateContactTable from "../UpdateContactTable";

const UpdateContactForm = () => {
  const [step, setStep] = useState("form");
  const tableRef = useRef(null);

  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    email: "",
    plan: "",
    oldPhone: "",
    newPhone: "",
  });

  const handleSubmit = async (data) => {
    try {
      await axios.post("/user-contact-updates", data);

      if (tableRef.current) {
        tableRef.current.fetchContactUpdates();
      }

      setStep("thankyou");
    } catch (error) {
      console.error("Error submitting update contact data:", error);
    }
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          {/* LEFT - FORM */}
          <div className="col-md-4">
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
          </div>

          {/* RIGHT - TABLE */}
          <div className="col-md-8">
            <UpdateContactTable
              ref={tableRef}
              title={
                <span style={{ color: "#104b45" }}>
                  Contact Update History
                </span>
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateContactForm;
