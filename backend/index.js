import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongodb from "mongodb";
import router from "./routes/routes.js"

const app = express();

// app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 5252;
const hostname = "localhost";

app.get("/", (req, res) => {
    // console.log(req);
    res.status(200).json({"message": "fine", "greet":"hello world!!"})
})

app.use("/shortUrl", router);

mongoose.connect("mongodb://127.0.0.1:27017/shorturls").then(() => {
app.listen(port, hostname, () => {
    console.log("server started at port " + port)
}) 
console.log("server is UP and database is connected succesfully")    
}).catch((err) => {
    console.log(err);
})

