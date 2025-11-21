import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import welcomeStyles from "../../css/WelcomePage.module.css";
import serviceStyles from "../../css/Service.module.css";
import "../../css/MyMealsOrderForm.css";
import "../../css/Customerform.css";
import "../../css/Paycash.css";
import "../../css/Success.css";

// Images
import bg from "../../assets/images/bg.png";
import meal1 from "../../assets/images/meal.png";
import service1 from "../../assets/images/service.png";
import delivery1 from "../../assets/images/delivery.png";
import roll1 from "../../assets/images/roll.png";
import features1 from "../../assets/images/features.png";
import plan1 from "../../assets/images/plan.png";
import menu1 from "../../assets/images/menu.png";
import lunch1 from "../../assets/images/lunch.png";
import dinner1 from "../../assets/images/dinner.png";

// Components
import WelcomeScreen from "./WelcomeScreen";
import ServiceCarousel from "./ServicesCarousel";
import OrderForm from "./OrderForm";
import SuccessSection from "./SuccessSection";

export default function WelcomePage() {
  const navigate = useNavigate();

  // === UI Flow States ===
  const [showService, setShowService] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // === Payment + Plan States ===
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);         // Dynamic plans
  const [meals, setMeals] = useState([]);         
  const [orders, setOrders] = useState([]);       
  const [orderMeals, setOrderMeals] = useState([]); 
  const [payments, setPayments] = useState([]);  

  // === Carousel Data ===
  const [carouselData, setCarouselData] = useState([
    { id: "1", title: "Item", image: meal1 },
    { id: "2", title: "Our Services", image: service1 },
    { id: "3", title: "Delivery", image: delivery1 },
    { id: "4", title: "Rollover", image: roll1 },
    { id: "5", title: "Some More Features", image: features1 },
    { id: "6", title: "Plan", image: plan1 },
    { id: "7", title: "Menu", image: menu1 },
    { id: "8", title: "Lunch", image: lunch1 },
    { id: "9", title: "Dinner", image: dinner1 },
  ]);

  // === Fetch Plans, Meals, Orders, OrderMeals, Payments ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, mealsRes, ordersRes, orderMealsRes, paymentsRes] =
          await Promise.all([
            axios.get("/plans"),
            axios.get("/meals"),
            axios.get("/orders"),
            axios.get("/order-meals"),
            axios.get("/payments"),
          ]);

        setPlans(plansRes.data);
        setMeals(mealsRes.data);
        setOrders(ordersRes.data);
        setOrderMeals(orderMealsRes.data);
        setPayments(paymentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchData();
  }, []);

  // === Handlers ===
  const handleWelcomeClick = (action) => {
    if (action === "signup") setShowService(true);
    else if (action === "login") navigate("/login");
  };

  const handleDotClick = (index) => setCurrentIndex(index);

  const handleSuccessDone = () => {
    setShowService(false);
    setShowOrderForm(false);
    setShowSuccess(false);
  };

  // === Conditional Rendering ===
  if (showSuccess) return <SuccessSection onDone={handleSuccessDone} />;

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {!showService && !showOrderForm && (
        <WelcomeScreen onAction={handleWelcomeClick} />
      )}

      {showService && !showOrderForm && (
        <ServiceCarousel
          carouselData={carouselData}
          currentIndex={currentIndex}
          onDotClick={handleDotClick}
          acknowledged={acknowledged}
          setAcknowledged={setAcknowledged}
          onFillForm={() => setShowOrderForm(true)}

        />
      )}

      {showOrderForm && (
        <OrderForm
          bg={bg}
          plan={plan}
          setPlan={setPlan}
          plans={plans}
          meals={meals}
          orders={orders}          
          orderMeals={orderMeals}   
          payments={payments}      
          onSuccess={() => setShowSuccess(true)}
        />
      )}
    </div>
  );
}
