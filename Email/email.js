import userModel from "../models/userModel.js";

const verifyEmail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ success: true, message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { verifyEmail };
