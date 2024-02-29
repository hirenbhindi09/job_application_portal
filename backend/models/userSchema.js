import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contains atleast 3 characters"],
    maxLength: [30, "Name must contains atleast 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "please provide a phone number"],
  },
  password: {
    type: String,
    required: [true, "please provide a Password"],
    minLength: [3, "Password must contains atleast 3 characters"],
    maxLength: [30, "Password must contains atleast 30 characters"],
    select: false,
  },

  role: {
    type: String,
    require: [true, "please provide a role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT token for Authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
