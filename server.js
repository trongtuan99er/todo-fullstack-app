require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hello ae")
});

app.post("/name", (req,res) => {
  if(req.body.name){
    return res.json({name: req.body.name});
  }else {
    return res.status(400).json({error : "no name "});
  }
})

mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("conect to mongo db");
  app.listen(process.env.PORT, ()=> {
    console.log(`server run on port ${process.env.PORT}`);
  })
}).catch((error) => {
  console.log(error);
});
