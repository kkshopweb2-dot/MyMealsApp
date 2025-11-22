import React from "react";
import { Controller } from "react-hook-form";
import qrCode from "../../assets/images/qrcode.png";

const StepFour = ({ control, watch, handleBack }) => {
  const watchAgree = watch("agree");

  return (
    <>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <Controller
            name="cashPaid"
            control={control}
            render={({ field }) => (
              <input type="checkbox" {...field} checked={field.value} id="cashPaid" />
            )}
          />
          <span>Cash Paid</span>
        </label>
      </div>

      {/* QR PAYMENT */}
      {!watch("cashPaid") && (
        <div className="paymentContainer">
          <div className="paymentHeader">QR Payment</div>
          <div className="merchantCard">
            <div>PATR FOOD AND BEVERAGES</div>
            <div className="account">36152201</div>
            <img src={qrCode} alt="Scan QR" className="qrCode" />
            <div>Scan & Pay</div>
          </div>

          <label>Amount Paid</label>
          <Controller name="amountPaid" control={control} render={({ field }) => (
            <input {...field} type="number" placeholder="Amount Paid" required />
          )}/>
          <label>Transaction ID *</label>
          <Controller name="transactionId" control={control} render={({ field }) => (
            <input {...field} type="text" placeholder="Transaction ID *" required />
          )}/>
          <label>Note</label>
          <Controller name="note" control={control} render={({ field }) => (
            <input {...field} type="text" placeholder="Note" />
          )}/>
          <label>Screenshot</label>
          <Controller name="screenshot" control={control} render={({ field }) => (
            <input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files[0])} />
          )}/>
        </div>
      )}

      {/* CASH PAYMENT */}
      {watch("cashPaid") && (
        <div className="paymentContainer">
          <Controller
            name="paymentMode"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" value="Delivery Boy" checked={field.value === "Delivery Boy"} onChange={() => field.onChange("Delivery Boy")} />
                  <span>Delivery Boy</span>
                </label>
                <label className="radio-option">
                  <input type="radio" value="At Office" checked={field.value === "At Office"} onChange={() => field.onChange("At Office")} />
                  <span>At Office</span>
                </label>
              </div>
            )}
          />

          {/* Delivery Boy Details */}
          {watch("paymentMode") === "Delivery Boy" && (
            <>
              <label>Delivery Boy Name</label>
              <Controller name="deliveryBoyName" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Delivery Boy Name" />
              )}/>
              <label>Delivery Boy Phone</label>
              <Controller name="deliveryBoyPhone" control={control} render={({ field }) => (
                <input {...field} type="tel" placeholder="Delivery Boy Phone" />
              )}/>
              <label>Delivery Date</label>
              <Controller name="deliveryDate" control={control} render={({ field }) => (
                <input {...field} type="date" />
              )}/>
              <label>Delivery Time</label>
              <Controller name="deliveryTime" control={control} render={({ field }) => (
                <input {...field} type="time" />
              )}/>
              <label>Amount Paid</label>
              <Controller name="amountPaid" control={control} render={({ field }) => (
                <input {...field} type="number" placeholder="Amount Paid" required />
              )}/>
              <label>Note</label>
              <Controller name="note" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Note" />
              )}/>
            </>
          )}

          {/* At Office Details */}
          {watch("paymentMode") === "At Office" && (
            <>
              <label>Date</label>
              <Controller name="officeDate" control={control} render={({ field }) => (
                <input {...field} type="date" />
              )}/>
              <label>Time</label>
              <Controller name="officeTime" control={control} render={({ field }) => (
                <input {...field} type="time" />
              )}/>
              <label>Note</label>
              <Controller name="note" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Note" />
              )}/>
            </>
          )}
        </div>
      )}

      <div className="checkbox-group">
        <label className="checkbox-label">
          <Controller
            name="agree"
            control={control}
            render={({ field }) => (
              <input type="checkbox" {...field} checked={field.value} id="agree" />
            )}
          />
          <span>Yes I Agree</span>
        </label>
      </div>

      <div className="button-group">
        <button type="button" className="back-btn" onClick={handleBack}>
          Back
        </button>
        <button type="submit" className="submit-btn" disabled={!watchAgree}>
          Submit Payment
        </button>
      </div>
    </>
  );
};

export default StepFour;
