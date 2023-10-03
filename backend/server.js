const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const upload = require("./utils/multer");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection URL
const DB_URL = process.env.DB_URL;

// Check the database connection
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));

app.use("/items", upload.single('image'), require('./Routes/Deborah/itemRoutes'));
app.use("/client", require("./Routes/Thivanka/apiRoutes"));
app.use("/user", require("./Routes/Janani/apiRoutes"));

// Port Number Assignment
const PORT = process.env.PORT || 8000;

// Display the working port
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
