import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

if (!process.env.MONGO_URL) {
  console.log("MONGO_URL is missing");
} else {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("✅ MongoDB connected");
      console.log("Connected database:", mongoose.connection.name);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:");
      console.error(err);
    });
}

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  country: String,
  visaType: String,
  message: String,
  status: {
    type: String,
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form =
  mongoose.models.Form ||
  mongoose.model("Form", FormSchema, "visa_application");

app.post("/api/contact", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        message: "MongoDB is not connected",
      });
    }

    const newForm = new Form({
      name: req.body.name,
      email: req.body.email || "",
      phone: req.body.phone,
      date: req.body.date || "",
      country: req.body.country,
      visaType: req.body.visaType,
      message: req.body.message,
    });

    const savedData = await newForm.save();

    res.json({
      success: true,
      message: "Appointment saved successfully",
      id: savedData._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default app;
