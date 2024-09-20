import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    specify: {
        type: String,
    },
    project: {
        type: Array,
        default: []
    },
    pinv: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Invoice = mongoose.model("Invoice", invoiceSchema)