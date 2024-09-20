import express from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/cookie.js"
import { userAuthenticated } from "../middlewares/userAuth.js"



const router = express.Router()




router.post("/register", async (req, res) => {
    try {
        const { username, name, password, mobile, email, relation } = req.body
        let createUser = await User.findOne({ email, username });
        if (createUser) {
            res.status(500).json({
                message: "User Already Exists"
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const encryptedpassword = await bcrypt.hashSync(password, salt)
            createUser = await User.create({
                username,
                password: encryptedpassword,
                name,
                email,
                mobile,
                relation
            })
        }
        res.status(200).json({
            success: true,
            message: "Successfully Registered"
        })
    } catch (error) {
        console.log(error)
    }
})


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            res.status(500).json({
                success: false,
                message: "User doesn't exist"
            })
        } else {
            const decrypt = await bcrypt.compareSync(password, user.password);
            if (!decrypt) {
                res.status(500).json({
                    success: false,
                    message: "Sorry credentials might be wrong"
                })
            } else {
                sendCookie(user, res, "Logged in Successfully", 201)
            }
        }
    } catch (error) {

    }
})


router.get("/refetch", userAuthenticated, async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        res.status(201).json({
            success: false,
            msg: error,
        })
    }
})


router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router