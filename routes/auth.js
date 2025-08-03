import express from "express";
import AsyncHandler from "../utils/AsyncHanler.js";
import { login, register } from "../Controllers/auth.js";
import { verifyEmail } from "../Email/email.js";

const app=express.Router();

app.post("/register",AsyncHandler(register))
app.post("/login",AsyncHandler(login))
app.get("/verify/:id",AsyncHandler(verifyEmail))
export default app