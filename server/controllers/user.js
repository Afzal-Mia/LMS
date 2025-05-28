import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
//here tryCatch is a higher level function 
export const register = TryCatch(async (req, res) => {
  const { email, name, password, role = "user" } = req.body; // Default role to "user"

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Create the user object for the activation token
  const userData = {
    name,
    email,
    password: hashPassword,
    role: role || "user", // Ensures default is applied if undefined
  };

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const activationToken = jwt.sign(
    { user: userData, otp },
    process.env.Activation_Secret,
    { expiresIn: "5m" }
  );

  await sendMail(email, "E-Learning OTP Verification", { name, otp });

  res.status(200).json({
    message: "OTP sent to your email",
    activationToken,
  });
});


export const verifyUser = TryCatch(async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    // Verify the activation token
    const verify = jwt.verify(activationToken, process.env.Activation_Secret);

    // Check if OTP is valid
    if (verify.otp !== otp) {
      return res.status(400).json({ message: "Wrong OTP" });
    }

    // Check if user already exists (to prevent duplicate registration)
    const existingUser = await User.findOne({ email: verify.user.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Create user in the database
    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
      role: verify.user.role || "user", // Ensures "user" is default if missing
    });

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(400).json({ message: "OTP Expired or Invalid Token" });
  }
});


export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });
  const mathPassword = await bcrypt.compare(password, user.password);
  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });
  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });
  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      message: "No User with this email",
    });

  const token = jwt.sign({ email }, process.env.Forgot_Secret);

  const data = { email, token };

  await sendForgotMail("E learning", data);

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  res.json({
    message: "Reset Password Link is send to you mail",
    token
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No user with this email",
    });

  if (user.resetPasswordExpire === null)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({
      message: "Token Expired",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;

  user.resetPasswordExpire = null;

  await user.save();

  res.json({ message: "Password Reset" });
});
