import { useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../Header";
import Sidebar from "../Sidebar";
import RenewalPaymentTable from "../RenewalPaymentTable"; 

import "../../css/dashboard.css";
import "../../css/RenewalPaymentTable.css";
import bgImage from "../../assets/images/bg.png"; 

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import ThankYou from "./ThankYou";

const RenewalPayment = () => {
  const [step, setStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      orderNo: "",
      location: "Old",
      locationConfirmed: false,
      name: "",
      email: "",
      phone: "",
      address: "",
      plan: "",
      renewalMonth: "",
      amountPaid: "",
      screenshot: null,
      transactionId: "",
      cashPaid: false,
      paymentMode: "",
      deliveryBoyName: "",
      deliveryBoyPhone: "",
      deliveryDate: "",
      deliveryTime: "",
      officeDate: "",
      officeTime: "",
      note: "",
      agree: false,
    },
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const onSubmitPayment = (data) => {
    console.log("Payment Data:", data);
    setPaymentConfirmed(true);
    reset();
    setStep(1);
  };

  if (paymentConfirmed) {
    return (
      <div className="dashboard-layout">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className={`dashboard-main ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="dashboard-content">
            <ThankYou setPaymentConfirmed={setPaymentConfirmed} />
          </main>
        </div>
      </div>
    );
  }

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
            padding: "20px",
          }}
        >
          <div className="flex-container" style={{ display: "flex", gap: "20px" }}>
            {/* Form Section */}
            <div className="form-section" style={{ flex: 1 }}>
              <div className="container-fluid renew-content">
                <div style={{ display: step >= 1 ? "block" : "none" }}>
                  <StepOne control={control} watch={watch} handleNext={handleNext} />
                </div>
                <div style={{ display: step >= 2 ? "block" : "none" }}>
                  <StepTwo control={control} handleNext={handleNext} handleBack={handleBack} />
                </div>
                <div style={{ display: step >= 3 ? "block" : "none" }}>
                  <StepThree
                    control={control}
                    watch={watch}
                    handleNext={handleNext}
                    handleBack={handleBack}
                  />
                </div>
                <div style={{ display: step >= 4 ? "block" : "none" }}>
                  <StepFour
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmitPayment={onSubmitPayment}
                    watch={watch}
                    handleBack={handleBack}
                  />
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div
              className="renew-card table-section"
              style={{ flex: 1, maxHeight: "80vh", overflowY: "auto" }}
            >
              
              <RenewalPaymentTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RenewalPayment;
