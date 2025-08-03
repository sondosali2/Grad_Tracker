import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected");   
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
            });
            };

export default connectDB;