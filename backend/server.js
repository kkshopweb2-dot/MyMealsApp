import express from "express";
import cors from "cors";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import planRoutes from "./routes/plans.js";
import mealRoutes from "./routes/meals.js";
import orderRoutes from "./routes/orders.js";
import orderMealRoutes from "./routes/order-meals.js";
import complaintRoutes from "./routes/complaints.js";
import feedbackRoutes from "./routes/feedbacks.js";
import deliveryLocationRoutes from "./routes/deliveryLocations.js";
import mealPreferenceRoutes from "./routes/mealPreferences.js";
import pauseResumeMealRoutes from "./routes/pauseResumeMeals.js";
import paymentRoutes from "./routes/payments.js";
import renewalPaymentRoutes from "./routes/renewalPayments.js";
import userContactUpdateRoutes from "./routes/userContactUpdates.js";
import searchRoutes from "./routes/search.js";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Middleware to sanitize the request URL
app.use((req, res, next) => {
  req.url = req.url.replace(/\r?\n|\r/g, '');
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-meals", orderMealRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/delivery-locations", deliveryLocationRoutes);
app.use("/api/meal-preferences", mealPreferenceRoutes);
app.use("/api/pause-resume", pauseResumeMealRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/renewal-payment", upload.any(), renewalPaymentRoutes);
app.use("/api/user-contact-updates", userContactUpdateRoutes);
app.use("/api/search", searchRoutes);

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
