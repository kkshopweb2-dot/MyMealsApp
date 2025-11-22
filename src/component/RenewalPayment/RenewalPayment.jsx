import { useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../Header";
import Sidebar from "../Sidebar";
import RenewalPaymentTable from "../RenewalPaymentTable"; 

import "../../css/dashboard.css";
import "../../css/PauseResumeMeals.css";
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
  const [submittedData, setSubmittedData] = useState([]); // State for table data

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
    setSubmittedData(prevData => [...prevData, data]); // Add new data to the table state
    setPaymentConfirmed(true);
  };

  const handleThankYouBack = () => {
    setPaymentConfirmed(false);
    setStep(1);
    reset();
  };

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
          <div className="row">
            {/* Form Section */}
            <div className="col-md-5">
              <form className="pause-card" onSubmit={handleSubmit(onSubmitPayment)}>
                {paymentConfirmed ? (
                  <ThankYou setPaymentConfirmed={handleThankYouBack} />
                ) : (
                  <>
                    {step === 1 && (
                      <StepOne control={control} watch={watch} handleNext={handleNext} />
                    )}
                    {step === 2 && (
                      <StepTwo control={control} handleNext={handleNext} handleBack={handleBack} />
                    )}
                    {step === 3 && (
                      <StepThree
                        control={control}
                        watch={watch}
                        handleNext={handleNext}
                        handleBack={handleBack}
                      />
                    )}
                    {step === 4 && (
                      <StepFour
                        control={control}
                        watch={watch}
                        handleBack={handleBack}
                      />
                    )}
                  </>
                )}
              </form>
            </div>

            {/* Table Section */}
            <div className="col-md-7">
              <RenewalPaymentTable data={submittedData} title="Renewal Payment Summary" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RenewalPayment;
