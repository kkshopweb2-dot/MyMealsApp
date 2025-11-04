import React from "react";
import { Controller } from "react-hook-form";
import style from "../../css/Renewal.module.css";
import qrCode from "../../assets/images/qrcode.png";

const StepFour = ({ control, handleSubmit, onSubmitPayment, watch, handleBack }) => {
  const watchCashPaid = watch("cashPaid");
  const watchPaymentMode = watch("paymentMode");
  const watchAgree = watch("agree");

  return (
    <form className={style.formBox} onSubmit={handleSubmit(onSubmitPayment)}>
      <Controller
        name="cashPaid"
        control={control}
        render={({ field }) => (
          <div className={style.checkboxGroup}>
            <input type="checkbox" {...field} checked={field.value} id="cashPaid" />
            <label htmlFor="cashPaid">Cash Paid</label>
          </div>
        )}
      />

      {/* QR PAYMENT */}
      {!watchCashPaid && (
        <div className={style.paymentContainer}>
          <div className={style.paymentHeader}>QR Payment</div>
          <div className={style.merchantCard}>
            <div>PATR FOOD AND BEVERAGES</div>
            <div className={style.account}>36152201</div>
            <img src={qrCode} alt="Scan QR" className={style.qrCode} />
            <div>Scan & Pay</div>
          </div>

          <Controller name="amountPaid" control={control} render={({ field }) => (
            <input {...field} type="number" placeholder="Amount Paid" className={style.input} required />
          )}/>
          <Controller name="transactionId" control={control} render={({ field }) => (
            <input {...field} type="text" placeholder="Transaction ID *" className={style.input} required />
          )}/>
          <Controller name="note" control={control} render={({ field }) => (
            <input {...field} type="text" placeholder="Note" className={style.input} />
          )}/>
          <Controller name="screenshot" control={control} render={({ field }) => (
            <input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files[0])} className={style.inputFile}/>
          )}/>
        </div>
      )}

      {/* CASH PAYMENT */}
      {watchCashPaid && (
        <div className={style.paymentContainer}>
          <Controller
            name="paymentMode"
            control={control}
            render={({ field }) => (
              <div className={style.radioGroup}>
                <label className={style.radioOption}>
                  <input type="radio" value="Delivery Boy" checked={field.value === "Delivery Boy"} onChange={() => field.onChange("Delivery Boy")} />
                  Delivery Boy
                </label>
                <label className={style.radioOption}>
                  <input type="radio" value="At Office" checked={field.value === "At Office"} onChange={() => field.onChange("At Office")} />
                  At Office
                </label>
              </div>
            )}
          />

          {/* Delivery Boy Details */}
          {watchPaymentMode === "Delivery Boy" && (
            <>
              <Controller name="deliveryBoyName" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Delivery Boy Name" className={style.input} />
              )}/>
              <Controller name="deliveryBoyPhone" control={control} render={({ field }) => (
                <input {...field} type="tel" placeholder="Delivery Boy Phone" className={style.input} />
              )}/>
              <Controller name="deliveryDate" control={control} render={({ field }) => (
                <input {...field} type="date" className={style.input} />
              )}/>
              <Controller name="deliveryTime" control={control} render={({ field }) => (
                <input {...field} type="time" className={style.input} />
              )}/>
              <Controller name="amountPaid" control={control} render={({ field }) => (
                <input {...field} type="number" placeholder="Amount Paid" className={style.input} required />
              )}/>
              <Controller name="note" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Note" className={style.input} />
              )}/>
            </>
          )}

          {/* At Office Details */}
          {watchPaymentMode === "At Office" && (
            <>
              <Controller name="officeDate" control={control} render={({ field }) => (
                <input {...field} type="date" className={style.input} />
              )}/>
              <Controller name="officeTime" control={control} render={({ field }) => (
                <input {...field} type="time" className={style.input} />
              )}/>
              <Controller name="note" control={control} render={({ field }) => (
                <input {...field} type="text" placeholder="Note" className={style.input} />
              )}/>
            </>
          )}
        </div>
      )}

      <div className={style.checkboxGroup}>
        <Controller
          name="agree"
          control={control}
          render={({ field }) => (
            <>
              <input type="checkbox" {...field} checked={field.value} id="agree" />
              <label htmlFor="agree">Yes I Agree</label>
            </>
          )}
        />
      </div>

      <div className={style.stepBtns}>
        <button type="button" className={style.backBtn} onClick={handleBack}>
          Back
        </button>
        <button type="submit" className={style.submitBtn} disabled={!watchAgree}>
          Submit Payment
        </button>
      </div>
    </form>
  );
};

export default StepFour;
