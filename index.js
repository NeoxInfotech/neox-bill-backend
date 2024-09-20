import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import clientRouter from "./routes/client.js"
import invoiceRouter from "./routes/invoice.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))



dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/client", clientRouter)
app.use("/api/v1/invoice", invoiceRouter)


app.get("/", (req, res) => {
    res.send("App is running successfully")
})

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "NeoxInvoice" });
        console.log("Database has been connected successfully at Neox🎇")
    } catch (error) {
        console.log(error)
    }
}


app.listen(5000, () => {
    ConnectDb();
    console.log("App Started 🎇🎊, Listening on 5000")
})
