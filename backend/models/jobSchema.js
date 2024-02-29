import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title !!"],
    minLength: [3, "Job title must contains min 3 characters !!"],
    maxLength: [50, "Job title must not contains more than 50 characters !!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [3, "Description must contains min 3 characters !!"],
    maxLength: [
      500,
      "Description must not contains more than 500 characters !!",
    ],
  },
  category: {
    type: String,
    required: [true, "Job category is required !!"],
  },
  country: {
    type: String,
    required: [true, "Job country is required"],
  },
  city: {
    type: String,
    required: [true, "Job city is required"],
  },
  location: {
    type: String,
    required: [true, "please prive your exact location !!"],
    minLength: [5, "Job location must contains atleast  5 characters !!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed salary must contains atleast 4  digits "],
    maxLength: [9, "Fixed salary must not exceed 9  digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From  must contains atleast 4  digits "],
    maxLength: [9, "Salary From  must not exceed 9  digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary To  must contains atleast 4  digits "],
    maxLength: [9, "Salary To  must not exceed 9  digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
