require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req,res) => {
    res.send("<h3>Backend First FullStack React</h3>");
});

app.use("/api/auth", authRoute)

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



