import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is working");
});

if (!process.env.MONGO_URL) {
  console.log("MONGO_URL is missing in .env file");
  process.exit(1);
}

console.log("MONGO_URL =", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("Connected database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err);
  });
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

const Form = mongoose.model("Form", FormSchema, "visa_application");

app.post("/api/contact", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        message: "MongoDB is not connected",
      });
    }

    console.log("FORM RECEIVED:", req.body);

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

    console.log("SAVED DATA ID:", savedData._id);

    res.json({
      success: true,
      message: "Appointment saved successfully",
      id: savedData._id,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
