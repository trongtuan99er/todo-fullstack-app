require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require('path')
// import routes

const authRoute = require("./routes/auth")
const todosRoute = require("./routes/todos")

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("hello ae")
});

app.use("/api/auth", authRoute)
app.use("/api/todos", todosRoute)

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (res, req) => {
  res.sendFile(path.resolve(__dirname,"./client/build", "index.html"));
})

mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("conect to mongo db");
  app.listen(process.env.PORT, ()=> {
    console.log(`server run on port ${process.env.PORT}`);
  })
}).catch((error) => {
  console.log(error);
});
