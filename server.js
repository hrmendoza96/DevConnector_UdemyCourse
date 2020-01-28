const express = require("express");
const app = express();
/**
 * Test endpoint
 */
app.get("/", (req, res) => res.send("API Running"));
/**
 * Looks for environment variable called
 * PORT to use when deployed. Locally it
 * is deployed in port 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //()=> callback: something you want to happen once the PORT connects.
