import React, { useState, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../../css/dashboard.css';
import "../../css/PauseResumeMeals.css";
import "../../css/DataTable.css"; // table styling like your example
import bgImage from "../../assets/images/bg.png";

import Step1Info from "./Step1Info";
import Step2Meals from "./Step2Meals";
import Step3Review from "./Step3Review";
import Step4ThankYou from "./Step4ThankYou";

// Map plan to available meals
export const planToMeals = (plan) => {
  switch (plan) {
    case "1": return ["Lunch", "Dinner"];
    case "2": return ["Breakfast", "Lunch", "Dinner"];
    case "3": return ["Lunch"];
    case "4": return ["Dinner"];
    case "5": return ["Breakfast"];
    default: return [];
  }
};

// Initialize meal state
export const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null } },
});

/* ---------- Reusable DataTable for Summary ---------- */
const SummaryDataTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 5;

  const filteredData = data.filter((item) =>
    `${item.orderNo} ${item.name} ${item.email} ${item.phone} ${item.plan} ${item.meal}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const paginatedData = filteredData.slice(
    (activePage - 1) * entriesPerPage,
    activePage * entriesPerPage
  );

  return (
    <div className="tableCard">
      {/* Search Bar */}
      <div className="tableSearch">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActivePage(1);
          }}
        />
        <FaSearch />
      </div>

      <table className="tableWrapper">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Meal</th>
            <th>Pause</th>
            <th>Resume</th>
            <th>Pause Date</th>
            <th>Resume Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.orderNo}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.plan}</td>
                <td>{row.meal}</td>
                <td>{row.pause}</td>
                <td>{row.resume}</td>
                <td>{row.pauseDate}</td>
                <td>{row.resumeDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="noData">No data found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
          disabled={activePage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={activePage === i + 1 ? "active" : ""}
            onClick={() => setActivePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
          disabled={activePage === totalPages}
        >
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

export default function PauseResumeMeals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);

  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());

  const handleNextFromInfo = () => {
    if (!plan) return alert("Please select a plan.");
    const enabledMeals = planToMeals(plan);
    const copy = initialMealState();
    enabledMeals.forEach((m) => (copy[m].checked = true));
    setMeals(copy);
    setStep(2);
  };

  const handleSubmitMeals = () => {
    if (!Object.values(meals).some((m) => m.checked)) {
      return alert("Please select at least one meal (per your plan).");
    }
    setStep(3);
  };

  const handleFinalSubmit = () => setStep(4);

  const setMealField = (meal, key, value) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], [key]: value } }));
  };

  const setMealDate = (meal, type, date) => {
    setMeals(prev => ({
      ...prev,
      [meal]: { ...prev[meal], dates: { ...prev[meal].dates, [type]: date } }
    }));
  };

  // Convert meals to flat table data
  const tableData = useMemo(() => {
    return Object.entries(meals)
      .filter(([_, data]) => data.checked)
      .map(([meal, data]) => ({
        orderNo: orderNo || "-",
        name: name || "-",
        email: email || "-",
        phone: phone || "-",
        plan: plan || "-",
        meal,
        pause: data.pause ? "Yes" : "No",
        resume: data.resume ? "Yes" : "No",
        pauseDate: data.dates.pause || "-",
        resumeDate: data.dates.resume || "-",
      }));
  }, [meals, orderNo, name, email, phone, plan]);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main
          className="dashboard-content"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container-fluid pause-content row">

            {step === 1 && (
              <Step1Info
                orderNo={orderNo} setOrderNo={setOrderNo}
                name={name} setName={setName}
                phone={phone} setPhone={setPhone}
                email={email} setEmail={setEmail}
                plan={plan} setPlan={setPlan}
                handleNext={handleNextFromInfo}
              />
            )}

            {step === 2 && (
              <Step2Meals
                plan={plan} meals={meals}
                setMealField={setMealField}
                setMealDate={setMealDate}
                handleSubmit={handleSubmitMeals}
                handleBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <Step3Review
                orderNo={orderNo}
                name={name}
                phone={phone}
                email={email}
                plan={plan}
                meals={meals}
                handleFinalSubmit={handleFinalSubmit}
                handleBack={() => setStep(2)}
              />
            )}

            {step === 4 && <Step4ThankYou />}

            {/* New Searchable & Paginated Summary Table */}
            <div className="pause-card col-md-7" style={{ marginLeft: '20px' }}>
              <h3>Pause / Resume Summary</h3>
              <SummaryDataTable data={tableData} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
