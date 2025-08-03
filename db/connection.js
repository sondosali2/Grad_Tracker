import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MONGO_URI is missing. Make sure it is set in Railway environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    }
};

export default connectDB;
