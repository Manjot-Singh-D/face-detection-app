const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = require("./Routes/routes.js");
// const passport = require("passport");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iec6u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// app.use(passport.initialize());
// require("./config/passport")(passport);

app.use("/api", Routes);
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
