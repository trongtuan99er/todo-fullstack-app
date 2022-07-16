require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

// import routes

const authRoute = require("./routes/auth")
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("hello ae")
});

app.use("/api/auth", authRoute)

mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("conect to mongo db");
  app.listen(process.env.PORT, ()=> {
    console.log(`server run on port ${process.env.PORT}`);
  })
}).catch((error) => {
  console.log(error);
});
