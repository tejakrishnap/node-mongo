require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

const workouts = require("./routes/workouts");

//middleware
app.use(cors());
app.use((req, res, next) => {
  console.log(`Middleware: ${req.path} - ${req.method}`);
  next();
});

app.use(express.json()); //takes JSON input in the request

app.use("/api/workouts", workouts);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to the DB`);

    app.listen(process.env.PORT, () => {
      console.log(`listening on port 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
