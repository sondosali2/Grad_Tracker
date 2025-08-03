import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import errorHandler from './utils/ErrorHandler.js';
import userRoutes from './routes/auth.js';
import CustomError from './utils/Error.js';

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use("/auth",userRoutes)

app.use((req, res, next) => {
    next(new Error("Route not found", 404));
});
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log('Server started on port 3000');
});