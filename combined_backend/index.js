const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin.routes");
const internRoutes = require("./routes/intern.routes");
const app = express();

connectDB().catch(err => console.log("DB Connection Failed: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded documents
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes
app.use("/api/admin", adminRoutes);
app.use("/api/interns", internRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Combined Server Running on Port ${PORT}`)
});
