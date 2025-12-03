import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
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

  // ✅ FETCH DATA AND ENSURE ARRAY
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user-contact-updates");
        console.log("Fetched Data from Backend:", response.data);

        // Ensure data is an array
        const dataArray = Array.isArray(response.data) ? response.data : [];
        setSubmittedData(dataArray);
      } catch (error) {
        console.error("Error fetching update contact data:", error);
        setSubmittedData([]); // fallback to empty array
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await axios.post("/user-contact-updates", data);

      // Ensure newly submitted data is added as an array
      setSubmittedData(prev => [...prev, data]);

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
              rows={Array.isArray(submittedData) ? submittedData : []}
              title={<span style={{ color: "#104b45" }}>Contact Update History</span>}
            />
          </div>

        </div>
      </div>
    </main>
  );
};

export default UpdateContactForm;
