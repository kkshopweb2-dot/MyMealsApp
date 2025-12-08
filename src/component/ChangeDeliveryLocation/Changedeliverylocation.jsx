import React, { useState, useRef } from "react";
import axios from "../../api/axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import DeliveryLocationTable from "../DeliveryLocationTable";
import styles from "../../css/Changedeliverylocation.module.css";
import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import Step1BasicInfo from "./Step1BasicInfo";
import Step2EffectiveDate from "./Step2EffectiveDate";
import Step3Meals from "./Step3Meals";
import Step4ChangeFor from "./Step4ChangeFor";
import Step5Address from "./Step5Address";
import Step6Preview from "./Step6Preview";
import Step7ThankYou from "./Step7ThankYou";

const Changedeliverylocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  // const [submittedData, setSubmittedData] = useState([]); // Removed submittedData state
  const tableRef = useRef(null); // Create a ref for DeliveryLocationTable

  const initialFormState = {
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
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "meals") {
      setFormData((prev) => ({
        ...prev,
        meals: checked
          ? [...prev.meals, value]
          : prev.meals.filter((m) => m !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ AXIOS SUBMIT WITH CONSOLE LOG
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const deliveryData = {
      order_no: formData.orderNo,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      plan: formData.plan,
      address_line_1: formData.primaryAddress,
      address_line_2: formData.secondaryAddress,
      city: formData.primaryCity,
      state: formData.primaryState,
      zip_code: formData.primaryZip,
      is_default: formData.addressType === "primary",
    };

    console.log("Data being sent:", deliveryData);

    try {
      const response = await axios.post("/delivery-locations", deliveryData);

      console.log("Server Response:", response.data);
      if (tableRef.current) {
        tableRef.current.fetchDeliveryLocations(); // Refresh table data after submission
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }

    // setSubmittedData((prev) => [...prev, formData]); // Removed
    setStep(7);
  };

  const handleNewSubmission = () => {
    setFormData(initialFormState);
    setStep(1);
  };

  return (
    <div className="row">
      {/* Form Section */}
      <div className="col-md-5">
        <div className={styles.deliveryFormCard}>
          {step === 1 && (
            <Step1BasicInfo
              {...{ formData, handleChange, confirmed, setConfirmed, nextStep }}
            />
          )}
          {step === 2 && (
            <Step2EffectiveDate
              {...{ formData, handleChange, nextStep, prevStep }}
            />
          )}
          {step === 3 && (
            <Step3Meals {...{ formData, handleChange, nextStep, prevStep }} />
          )}
          {step === 4 && (
            <Step4ChangeFor
              {...{ formData, handleChange, nextStep, prevStep }}
            />
          )}
          {step === 5 && (
            <Step5Address {...{ formData, handleChange, nextStep, prevStep }} />
          )}
          {step === 6 && (
            <Step6Preview {...{ formData, handleSubmit, prevStep }} />
          )}
          {step === 7 && (
            <Step7ThankYou handleNewSubmission={handleNewSubmission} />
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="col-md-7">
        <DeliveryLocationTable
          ref={tableRef} // Pass the ref to DeliveryLocationTable
          // rows={submittedData} // Removed
          title={
            <span style={{ color: "#104b45" }}>
              Delivery Location Change Summary
            </span>
          }
        />
      </div>
    </div>
  );
};

export default Changedeliverylocation;
