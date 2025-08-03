import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required().messages({ "string.empty": "Name is required" }),
email: Joi.string().required().messages({
  "string.empty": "Email is required"
}),
  password: Joi.string().min(6).required().messages({ "string.min": "Password must be at least 6 characters", "string.empty": "Password is required" }),
  confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
    "any.only": "Passwords do not match"}),
      role: Joi.string().valid("student", "supervisor", "admin").required().messages({
          "string.empty": "Role is required",
          "any.only": "Invalid role"
      })
  })

const loginSchema = Joi.object({
email: Joi.string().required().messages({
  "string.empty": "Email is required"
}),  password: Joi.string().min(6).required().messages({ "string.min": "Password must be at least 6 characters", "string.empty": "Password is required" }),
  confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
    "any.only": "Passwords do not match",
  }),
});
export { registerSchema, loginSchema} ;