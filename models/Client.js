import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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
    sales: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })


export const Client = mongoose.model("Client", clientSchema)