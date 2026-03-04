const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware 
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-full-stack-navy.vercel.app"
    ],
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());   

// Import Routes
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

// Route Middleware
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);

// Database Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
