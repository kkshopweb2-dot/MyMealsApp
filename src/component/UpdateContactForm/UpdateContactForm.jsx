import React, { useState } from "react";
import "../../css/UpdateContactForm.css";
import "../../css/dashboard.css";

import UpdateForm from "./UpdateForm";
import ThankYouMessage from "./ThankYouMessage";
import UpdateContactTable from "../UpdateContactTable";

const UpdateContactForm = () => {
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


    <main >
      <div className="container-fluid">
        <div className="row">

          {/* LEFT - FORM (col-md-6) */}
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
          {/* RIGHT - TABLE (col-md-6) */}
          <div className="col-md-8">
            <UpdateContactTable
              rows={submittedData}
              title={<span style={{ color: "#104b45" }}>Contact Update History</span>}
            />
          </div>


        </div>
      </div>
    </main>

  );
};

export default UpdateContactForm;
