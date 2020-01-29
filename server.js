const express = require("express");
const connectDB = require("./config/db");
const app = express();
//Connect Databse
connectDB();
//Init Middleware
app.use(express.json({ extended: false })); // Allow to get data in req.body
// Test endpoint
app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
/**
 * Looks for environment variable called
 * PORT to use when deployed. Locally it
 * is deployed in port 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //()=> callback: something you want to happen once the PORT connects.
