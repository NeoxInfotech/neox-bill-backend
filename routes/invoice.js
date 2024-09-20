import express, { response } from "express"
import { Invoice } from "../models/Invoice.js";


const router = express.Router();


router.post("/createinvoice", async (req, res) => {
    try {
        const { cname, address1, address2, phone, specify, pname, pqty, pamount, pdetails, status } = req.body;
        const pinv = "NX" + (Math.floor(Math.random() * (9000000 - 100000 + 1)) + 100000);
        const createInvoice = await Invoice.create({
            cname,
            address1,
            address2,
            phone,
            specify,
            pinv,
            project: {
                pname: pname,
                pqty: pqty,
                pamount: pamount,
                pdetails: pdetails
            },
            status
        })
        res.status(200).json({
            success: true,
            message: "Invoice Has been added",
            invId: pinv
        })
    } catch (error) {
        console.log(error)
    }

})


router.post("/addproject/:invid", async (req, res) => {
    try {
        const { pqty, pamount, pdetails, pname } = req.body;

        const UpdateInvoice = await Invoice.findOne({ pinv: req.params.invid })
        await UpdateInvoice.updateOne({ $push: { project: { pname, pqty, pamount, pdetails } } })
        res.status(200).json({
            success: true,
            response: "Invoice has been updated"
        })
    } catch (error) {
        console.log(error)
    }

})


router.get("/getinvoice/:inv", async (req, res) => {
    try {
        const invoiceone = await Invoice.findOne({ pinv: req.params.inv })
        res.status(200).json({
            success: true,
            message: invoiceone,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
        })
    }
})

// get from id
router.get("/getinvoicebyid/:id", async (req, res) => {
    try {
        const invoiceone = await Invoice.findOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: invoiceone,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
        })
    }
})
router.get("/getinvoices", async (req, res) => {
    try {
        const invoiceall = await Invoice.find()
        res.status(200).json({
            success: true,
            message: invoiceall,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
        })
    }
})

router.put("/updatestatus/:inv", async (req, res) => {
    try {
        const getInvoice = await Invoice.findOne({ pinv: req.params.inv })
        await getInvoice.updateOne({ status: true })
        res.status(200).json({
            success: true,
            message: "Status has been updated, Client Status : PAID"
        })
    } catch (error) {
        console.log(error)
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {
        const delInvoice = await Invoice.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: "Invoice has been deleted"
        })
    } catch (error) {
        console.log(error)
    }
})

router.put("/updateinv/:id", async (req, res) => {
    try {
        const updateInv = await Invoice.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json({
            success: true,
            message: updateInv,
            response: "Successfully Edited"
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            response: error
        })
    }
})


export default router