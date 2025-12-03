import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // ✅ named import

import { logout } from "../../redux/authSlice";
import Step1Info from "./Step1Info";
import Step2Meals from "./Step2Meals";
import Step3Review from "./Step3Review";
import Step4ThankYou from "./Step4ThankYou";

import "../../css/PauseResumeMeals.css";
import "../../css/dashboard.css";

// ================= HELPERS =================
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

export const initialMealState = () => ({
  Breakfast: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null }, reason: "" },
  Lunch: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null }, reason: "" },
  Dinner: { checked: false, pause: false, resume: false, dates: { pause: null, resume: null }, reason: "" },
});

// ================= SUMMARY TABLE =================
const SummaryDataTable = ({ data, title }) => {
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
      {title && <h3 className="mb-4">{title}</h3>}

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

      <div className="table-responsive">
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
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index} className={row.isCurrent ? "current-row" : "submitted-row"}>
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
                  <td>{row.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="noData">No data available to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => setActivePage(p => Math.max(p - 1, 1))} disabled={activePage === 1}>
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

        <button onClick={() => setActivePage(p => Math.min(p + 1, totalPages))} disabled={activePage === totalPages}>
          &gt;
        </button>
      </div>

      <div className="entriesInfo">
        Showing {paginatedData.length} of {filteredData.length} entries
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
export default function PauseResumeMeals() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= FETCH EXISTING DATA =================
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    const fetchPauseResumeData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
          const decodedToken = jwtDecode(user.token);
          if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(logout());
            navigate("/");
            return;
          }
        } else {
          dispatch(logout());
          navigate("/");
          return;
        }

        const response = await api.get("/pause-resume");

        const mappedData = response.data.map(item => ({
          orderNo: item.order_no || "-",
          name: item.name || "-",
          email: item.email || "-",
          phone: item.phone || "-",
          plan: item.plan || "-",
          meal: item.meal_type || "-",
          pause: item.action === "Pause" ? "Yes" : "No",
          resume: item.action === "Resume" ? "Yes" : "No",
          pauseDate: item.start_date || "-",
          resumeDate: item.end_date || "-",
          reason: item.reason || "-",
          isCurrent: false, // previous entries are not current
        }));

        setPreviousData(mappedData);

      } catch (error) {
        console.error("❌ Error fetching pause/resume data:", error.response?.data || error.message);
        if (error.response?.status === 500 || error.response?.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      }
    };

    fetchPauseResumeData();
  }, [dispatch, navigate]);

  // ================= FORM STATE =================
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [meals, setMeals] = useState(initialMealState());
  const [reason, setReason] = useState("");

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

  const handleFinalSubmit = async () => {
    const checkedMeals = Object.entries(meals).filter(([_, data]) => data.checked);

    if (checkedMeals.length === 0) {
      return alert("Please select at least one meal to pause or resume.");
    }

    for (const [meal, data] of checkedMeals) {
      if (data.pause && !data.dates.pause) {
        return alert(`Please select a pause date for ${meal}.`);
      }
      if (data.resume && !data.dates.resume) {
        return alert(`Please select a resume date for ${meal}.`);
      }
      if (!data.pause && !data.resume) {
        return alert(`Please select 'Pause' or 'Resume' for ${meal}.`);
      }
    }

    try {
      const mealData = checkedMeals.map(([meal, data]) => ({
        meal_type: meal,
        action: data.pause ? "Pause" : "Resume",
        start_date: data.dates.pause,
        end_date: data.dates.resume,
        reason: reason,
      }));

      const response = await api.post("/pause-resume", {
        order_no: orderNo,
        meals: mealData,
      });

      const newEntries = mealData.map(md => ({
        orderNo,
        name,
        email,
        phone,
        plan,
        meal: md.meal_type,
        pause: md.action === "Pause" ? "Yes" : "No",
        resume: md.action === "Resume" ? "Yes" : "No",
        pauseDate: md.start_date || "-",
        resumeDate: md.end_date || "-",
        reason: md.reason || "-",
        isCurrent: false, // mark submitted as not current
      }));

      setPreviousData(prev => [...prev, ...newEntries]);
      setStep(4);

    } catch (error) {
      console.error("❌ Failed to submit:", error.response?.data || error.message);
    }
  };

  const setMealField = (meal, key, value) => {
    setMeals(prev => ({ ...prev, [meal]: { ...prev[meal], [key]: value } }));
  };

  const setMealDate = (meal, type, date) => {
    setMeals(prev => ({
      ...prev,
      [meal]: { ...prev[meal], dates: { ...prev[meal].dates, [type]: date } }
    }));
  };

  // ================= COMBINED TABLE DATA =================
  const tableData = useMemo(() => {
    const currentData = Object.entries(meals)
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
        reason: reason || "-",
        isCurrent: true, // mark current form data
      }));

    return [...previousData, ...currentData];
  }, [meals, orderNo, name, email, phone, plan, reason, previousData]);

  return (
    <div className="container-fluid row">
      <div className="col-md-5">
        <div className="pause-card">
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
              reason={reason}
              setReason={setReason}
              handleFinalSubmit={handleFinalSubmit}
              handleBack={() => setStep(2)}
            />
          )}

          {step === 4 && <Step4ThankYou />}
        </div>
      </div>

      <div className="col-md-7">
        <SummaryDataTable
          data={tableData}
          title={<span style={{ color: "#104b45" }}>Pause / Resume Summary</span>}
        />
      </div>
    </div>
  );
}
