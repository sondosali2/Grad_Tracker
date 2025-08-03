import mongoose from "mongoose";
const user= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength: 8,
            },
            confirmpassword:{
                
                type:String,
              
                trim:true,
                minlength: 8,
            },
             role: {
    type: String,
    enum: ["student", "supervisor", "admin"],
    required: true,
  },
  isVerified: {
      type: Boolean,
      default: false
  }
},{timestamps:true})

export default mongoose.model("user", user);