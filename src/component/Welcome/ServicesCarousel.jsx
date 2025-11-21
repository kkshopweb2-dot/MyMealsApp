import React from "react";
import serviceStyles from "../../css/Service.module.css";

export default function ServiceCarousel({
  carouselData,
  currentIndex,
  onDotClick,
  acknowledged,
  setAcknowledged,
  onFillForm,
}) {
  return (
    <div className={serviceStyles.pageWrapper}>
      <div className={serviceStyles.formCard}>
        <h1 className={serviceStyles.title}>Our Services</h1>

        <div className={serviceStyles.carouselWrapper}>
          <div
            className={serviceStyles.carouselInner}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselData.map((item) => (
              <div key={item.id} className={serviceStyles.carouselItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={serviceStyles.carouselImg}
                />
                <p className={serviceStyles.imageText}>{item.title}</p>
              </div>
            ))}
          </div>

          <div className={serviceStyles.indicatorContainer}>
            {carouselData.map((_, index) => (
              <span
                key={index}
                className={`${serviceStyles.dot} ${
                  currentIndex === index ? serviceStyles.activeDot : ""
                }`}
                onClick={() => onDotClick(index)}
              />
            ))}
          </div>
        </div>

        <p className={serviceStyles.warningText}>
          Please proceed only if you have confirmed the Delivery Location by
          MYMEALS Team
        </p>

        <div className={serviceStyles.checkboxContainer}>
          <label className={serviceStyles.switch}>
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <span className={serviceStyles.slider}></span>
          </label>
          <p className={serviceStyles.checkboxText}>
            Not confirming the location and proceeding would lead to NON-REFUND
            if payment is made. <br />
            If not confirmed, send your Delivery location to{" "}
            <a href="tel:+917606006111" className={serviceStyles.phoneLink}>
              +917606006111
            </a>
          </p>
        </div>

        <button
          className={`${serviceStyles.button} ${
            !acknowledged ? serviceStyles.buttonDisabled : ""
          }`}
          disabled={!acknowledged}
          onClick={onFillForm}
        >
          Fill the form
        </button>
      </div>
    </div>
  );
}
