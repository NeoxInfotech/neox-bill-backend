import express from "express"
import { Client } from "../models/Client.js";

const router = express.Router();



router.post("/addclient", async (req, res) => {
    try {
        const { cname, address1, address2, phone, specify, sales } = req.body
        const clientcreate = await Client.create({
            cname,
            address1,
            address2,
            phone,
            specify,
            sales
        })
        res.status(200).json({
            success: true,
            message: "Client Has been successfully added"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "Something Went Wrong"
        })
    }
})


router.put("/editclient/:id", async (req, res) => {
    try {
        const updateClient = await Client.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json({
            success: true,
            message: updateClient,
            response: "Successfully Edited"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})

router.get("/getone/:id", async (req, res) => {
    try {
        const oneclient = await Client.findById({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: oneclient,
        })
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
})

router.get("/getname/:name", async (req, res) => {
    try {
        const oneclient = await Client.findOne({ cname: req.params.name });
        res.status(200).json({
            success: true,
            message: oneclient,
        })
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
})



router.delete("/deleteclient/:id", async (req, res) => {
    try {
        const deleteCLient = await Client.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: "Client has been successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})



router.get("/getallclients", async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json({
            success: true,
            response: clients,
            message: "Viewing all clients"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})




export default router