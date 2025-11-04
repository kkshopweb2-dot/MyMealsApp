import React from "react";
import welcomeStyles from "../../css/WelcomePage.module.css";
import logo from "../../assets/images/logo.png";

export default function WelcomeScreen({ onAction }) {
  return (
    <div className={welcomeStyles.welcomeContainer}>
      <div className={welcomeStyles.logoContainer}>
        <img src={logo} alt="Logo" className={welcomeStyles.logo} />
      </div>

      <header className={welcomeStyles.welcomeHeader}>
        <h1>Healthy Meal</h1>
        <h2>We say it's healthy ...</h2>
        <h2>We mean it ...</h2>
      </header>

      <div className={welcomeStyles.buttonContainer}>
        <button
          className={welcomeStyles.signupBtn}
          onClick={() => onAction("signup")}
        >
          Sign Up
        </button>
        <button
          className={welcomeStyles.loginBtn}
          onClick={() => onAction("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
