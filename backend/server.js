import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

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
import userContactUpdateRoutes from "./routes/userContactUpdates.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/pause-resume-meals", pauseResumeMealRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/user-contact-updates", userContactUpdateRoutes);

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
