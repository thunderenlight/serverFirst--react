require("dotenv").config();
const express = require("express")

const app = express()

const mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req,res) => {
    res.send("<h3>Backend First FullStack React</h3>");
});
app.post("/double", (req, res) => {
    if(req.body.double){
        return res.json({double: req.body.double});
    } else {
        return res.status(400).json({ error: "No double provided" })
    }
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB");
        
        app.listen(process.env.PORT, ()=> {
            console.log(`Server Here on port ${process.env.PORT}`)
        });
    }).catch((err) => {
        console.log(err);
});



