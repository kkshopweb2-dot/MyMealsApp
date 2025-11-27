import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from "./component/PrivateRoute";

// ===== Lazy load components =====
const WelcomePage = lazy(() => import("./component/Welcome/WelcomePage"));
const Login = lazy(() => import("./component/login"));
const Dashboard = lazy(() => import("./component/Dashboard"));
const MenuModal = lazy(() => import("./component/MenuModal"));
const Profile = lazy (() => import("./component/Profile"));

const PauseResumeTable = lazy(() => import("./component/PauseResumeTable"));

const TransactionsTable = lazy(() => import("./component/TransactionsTable"));
const ComplaintTable = lazy(() => import("./pages/ComplaintTablePage"));
const RenewalPaymentTable = lazy(() => import("./component/RenewalPaymentTable"));
const MealPreferenceTable = lazy(() => import("./component/MealPreferenceTable"));
const UpdateContactTable = lazy(() => import("./component/UpdateContactTable"));
const FeedbackTable = lazy(() => import("./component/FeedbackTable"));

// New Pages
const SignupPage = lazy(() => import("./pages/SignupPage"));
const RenewalPaymentPage = lazy(() => import("./pages/RenewalPaymentPage"));
const PauseResumeMealsPage = lazy(() => import("./pages/PauseResumeMealsPage"));
const FeedbackFormPage = lazy(() => import("./pages/FeedbackFormPage"));
const UpdateContactFormPage = lazy(() => import("./pages/UpdateContactFormPage"));
const MealPreferenceFormPage = lazy(() => import("./pages/MealPreferenceFormPage"));
const ChangeDeliveryLocationPage = lazy(() => import("./pages/ChangeDeliveryLocationPage"));
const ComplaintPage = lazy(() => import("./pages/ComplaintPage"));


const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);


  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <WelcomePage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Profile"   element={<Profile />}  />
            <Route path="/RenewalPayment" element={<RenewalPaymentPage />} />
            <Route path="/PauseResumeMeals" element={<PauseResumeMealsPage />} />
            <Route path="/FeedbackForm" element={<FeedbackFormPage />} />
            <Route path="/UpdateContactForm" element={<UpdateContactFormPage />} />
            <Route path="/MealPreferenceForm" element={<MealPreferenceFormPage />} />
            <Route path="/Changedeliverylocation" element={<ChangeDeliveryLocationPage />} />
            <Route path="/TransactionsTable" element={<TransactionsTable />} />
            <Route path="/PauseResumeTable" element={<PauseResumeTable />} />
            <Route path="/ComplaintTable" element={<ComplaintTable />} />
            <Route path="/RenewalPaymentTable" element={<RenewalPaymentTable />} />
            <Route path="/MealPreferenceTable" element={<MealPreferenceTable />} />
            <Route path="/UpdateContactTable" element={<UpdateContactTable />} />
            <Route path="/FeedbackTable" element={<FeedbackTable />} />
            <Route path="/menu" element={<MenuModal />} />
            <Route path="/complaint" element={<ComplaintPage />} />
          </Route>
        </Routes>
      {/* <Suspense fallback={<div className="loading">Loading...</div>}>
      </Suspense> */}
    </Router>
  );
};

export default App;