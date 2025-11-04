import React from "react";

export default function MapPreview({ deliveryAddress }) {
  return (
    <div className={`mymeals-map-container ${deliveryAddress ? "active" : ""}`}>
      {deliveryAddress ? (
        <iframe
          title="Delivery Location"
          frameBorder="0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(deliveryAddress)}&output=embed`}
          allowFullScreen
        />
      ) : (
        <p className="mymeals-map-placeholder">🗺️ Enter delivery address to preview map</p>
      )}
    </div>
  );
}
