import React, { useState } from "react";
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
            <div className="form-and-table-container">
              <div className="form-wrapper">
                <div className="card">
                  {/* Step-based rendering inside card */}
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
                      setStep={setStep}
                    />
                  )}

                  {step === "thankyou" && <ThankYou />}
                </div>
              </div>
              <div className="table-container">
                <ComplaintTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Complaint;
