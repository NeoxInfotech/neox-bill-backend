import express from "express"
import { User } from "../models/User.js";

const router = express.Router();






router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json({
            success: true,
            message: updatedUser,
            text: "User has been Updated"
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: "User has been successfully deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
})



export default router