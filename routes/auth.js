const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const validateRegisterInput = require("../validation/registerValidation")
const jwt = require("jsonwebtoken");
const requiresAuth = require('../middleware/permissions')


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

        const payload =  { userId: savedUser._id };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });


        const userToReturn = { ...savedUser._doc }
        delete userToReturn.password
        return res.json(userToReturn );

    } catch(err) {
        console.log(err)
        res.status(500).send(err.message);
    }
    res.send("auth route working")
})

// @route POST /api/auth/login
// @desc login user and return an access token 
// @access Public
router.post("/login", async (req, res) => {
    try {
        // check for the user
        const user = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i"),
        })

        if(!user){
            return res
            .status(400)
            .json({error: "There was a problem with your login credentials"})
        }
        const passwordMatch = await bcrypt.compare(
            req.body.password, 
            user.password
    );
    if(!passwordMatch) {
        return res
        .status(400)
        .json({ error: "There was a problem with your login "});
    }
    const payload =  { userId: user._id };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("access-token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })

    const userToReturn = { ...user._doc }
    delete userToReturn.password;

    return res.json({ 
        token: token,
        user: userToReturn 
    })

    } catch(err) {
        console.log(err);

        return res.status(500).send(err.message);
    }
})
// @route Get /api/auth/current
// @desc Return the current authed user 
// @access Private

router.get("/current", requiresAuth, async (req, res) => {
    if(!req.user){
        return res.status(401).send("Unauthorized")
    }
    return res.json(req.user);
})


// @route PUT /api/auth/logout
// @desc logout user and clear the cookie 
// @access Private

router.put("/logout", requiresAuth, (req, res) =>{
    try {
        res.clearCookie("access-token");

        return res.json({ success: true })
    }catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

module.exports = router;