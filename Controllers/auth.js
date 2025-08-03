import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import CustomError from "../utils/Error.js";
import * as validation from "../validation/validation.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
const register=async(req,res,next)=>{
    const { error } = validation.registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const allErrors = error.details.map(err => err.message);
    return res.status(400).json({ success: false, errors: allErrors });
  }
 
    const {name,email,password,confirmpassword,role}=req.body
    if(!name||!email||!password||!confirmpassword||!role){
        return next(new Error("All fields are required",400))}
        if(password!==confirmpassword){
            return next(new Error("Passwords do not match",400))
        }
        
        if(!email.includes("@")){
            return next(new Error("Please enter a valid email",400))
        }
        if(password.length<6){
            return next(new Error("Password must be at least 6 characters long",400))
        }
        const exist=await userModel.findOne({email})
        if(exist){
            return next(new Error("Email already exists",400))
            }
            const hash=await bcrypt.hash(password,10)
            
            const user=new userModel({name,email,password:hash,role})
            await user.save()
            
              const verificationLink = `http://localhost:5000/auth/verify/${user._id}`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<h3>Click to verify:</h3><a href="${verificationLink}">${verificationLink}</a>`
  });
console.log("EMAIL:", process.env.GMAIL_USER);
console.log("PASS:", process.env.GMAIL_PASS);

  res.status(201).json({ success: true, message: "Verification email sent. Please check your inbox." });
};

const login=async(req,res,next)=>{
        const { error } = validation.loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const allErrors = error.details.map(err => err.message);
    return res.status(400).json({ success: false, errors: allErrors });
  }
    const {email,password,confirmpassword}=req.body 
    if(!email||!password){
        return next(new Error("All fields are required",400))
    }
    const user=await userModel.findOne({email})
    if(!user){
        return next(new Error("Invalid email or password",400))
    }
     if (!user.isVerified) {
    return res.status(401).json({ success: false, message: "Please verify your email first." });
  }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return next(new Error("Invalid email or password",400))
    }
    if(confirmpassword!==password){
        return next(new Error("Passwords do not match",400))
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(200).json({success:true,user,token})
}

export {register,login}