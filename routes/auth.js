const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const validateRegisterInput = require("../validation/registerValidation")
// @route GET /api/auth/test
//@desc Test the route
//@access Public

router.get("/test", (req,res) => {
    res.send("auth route working")
})

// @route POST /api/auth/register
// @desc Create registration route
// @access Public

router.post("/register", async (req,res) => {
    try {
        const {errors, isValid } = validateRegisterInput(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }
        // check for an existing user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        })
        
        if(existingEmail) {
            return res 
                .status(400)
                .json({ error: "There is already a user with this email"})
        }

        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });
        const savedUser = await newUser.save();
        return res.json(savedUser);

    } catch(err) {
        console.log(err)
        res.status(500).send(err.message);
    }
    res.send("auth route working")
})

module.exports = router;