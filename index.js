const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const api = require("./apiRoutes/api");

require("dotenv").config();

const app = express();

const port = process.env.PORT;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECREATE;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Connecting to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connect successfully");
  })
  .catch((err) => errorHandler(err));

app.use("/api/v1", api);

//   Listining Port
app.listen(port, () =>
  console.log(`Server listening on port http://127.0.0.1:${port}`)
);
