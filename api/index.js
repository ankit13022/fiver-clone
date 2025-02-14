import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import gigRoute from './routes/gigRoute.js';
// import orderRoute from './routes/orderRoute.js';
// import conversationRoute from './routes/conversationRoute.js';
// import messageRoute from './routes/messageRoute.js';
// import reviewRoute from './routes/reviewRoute.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongo DB");
    } catch (error) {
        console.log(error);
    }
}
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);
// app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
    connect();
    console.log("server is running at port 8800");
})