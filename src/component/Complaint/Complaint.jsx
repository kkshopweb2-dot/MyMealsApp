import React, { useState } from "react";
import axios from "../../api/axios";
import "../../css/Complaint.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../css/dashboard.css";
import bgImage from "../../assets/images/bg.png";

import ComplaintTable from "../../pages/ComplaintTablePage";
import OrderDetailsForm from "./OrderDetailsForm";
import ComplaintForm from "./ComplaintForm";
import ThankYou from "./ThankYou";

const Complaint = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState("order");

  const [orderData, setOrderData] = useState({
    orderNo: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    plan: "",
  });

  const [complaintData, setComplaintData] = useState({
    complaint: [],
    date: new Date(),
    meal: "",
    issue: "",
    imageUri: null,
  });

  const [submittedComplaints, setSubmittedComplaints] = useState([]);

  // ✅ Submit & send data to backend
  const handleSubmit = async (newComplaint) => {
    const fullComplaint = {
      ...orderData,
      ...newComplaint, // Keep original fields for the table
      subject: newComplaint.complaint.join(", "), // Add field for backend
      description: newComplaint.issue, // Add field for backend
      date: new Date().toLocaleDateString(),
    };

    console.log("Sending complaint data:", fullComplaint);

    try {
      const response = await axios.post("/complaints", fullComplaint);

      console.log("Backend response:", response.data);

      setSubmittedComplaints((prev) => [...prev, fullComplaint]);
      setStep("thankyou");
    } catch (error) {
      console.error("Error sending complaint:", error);
    }
  };

  return (
    <main>
      <div className="empty-dashboard">
        <div className="form-and-table-container">
          <div className="form-wrapper">
            <h2 className="heading">Raise a Complaint</h2>

            {step === "order" && (
              <OrderDetailsForm
                orderData={orderData}
                setOrderData={setOrderData}
                setStep={setStep}
              />
            )}

            {step === "complaint" && (
              <ComplaintForm
                complaintData={complaintData}
                setComplaintData={setComplaintData}
                handleSubmit={handleSubmit}
              />
            )}

            {step === "thankyou" && <ThankYou />}
          </div>

          <div className="table-container">
            <ComplaintTable data={submittedComplaints} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Complaint;