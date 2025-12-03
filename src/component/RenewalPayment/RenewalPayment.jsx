import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { logout } from "../../redux/authSlice";

import RenewalPaymentTable from "../RenewalPaymentTable";

import "../../css/dashboard.css";
import "../../css/PauseResumeMeals.css";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import ThankYou from "./ThankYou";

const RenewalPayment = () => {
  const [step, setStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const [submittedData, setSubmittedData] = useState([]);
  const [page, setPage] = useState(1);        // <-- For backend pagination
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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

  // ==============================
  // FETCH PAGINATED DATA
  // ==============================
  const fetchRenewalPayments = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`/renewal-payment?page=${pageNumber}`);

      console.log("Fetched from backend:", response.data);

      setSubmittedData(response.data.data);    // <-- table records
      setTotalPages(response.data.totalPages); // <-- for pagination UI later
      setPage(response.data.page);

    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
    }
  };

  // Load on mount
  useEffect(() => {
    fetchRenewalPayments(1);
  }, []);

  // ==============================
  // SUBMIT FORM
  // ==============================
  const onSubmitPayment = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      await axios.post("/renewal-payment", formData);

      // Refresh table after submit
      fetchRenewalPayments(1);

      setPaymentConfirmed(true);

    } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
    }
  };

  const handleThankYouBack = () => {
    setPaymentConfirmed(false);
    setStep(1);
    reset();
  };

  return (
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
                <StepThree control={control} watch={watch} handleNext={handleNext} handleBack={handleBack} />
              )}
              {step === 4 && (
                <StepFour control={control} watch={watch} handleBack={handleBack} />
              )}
            </>
          )}
        </form>
      </div>

      {/* Table Section */}
      <div className="col-md-7">
        <RenewalPaymentTable
          data={submittedData}
          title={<span style={{ color: "#104b45" }}>Renewal Payment Summary</span>}
          page={page}
          totalPages={totalPages}
          onPageChange={fetchRenewalPayments}
        />
      </div>
    </div>
  );
};

export default RenewalPayment;
