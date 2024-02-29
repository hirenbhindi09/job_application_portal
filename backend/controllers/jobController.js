import { Job } from "../models/jobSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// ----------------------- get all jobs
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// ------------------------- post jobs

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job seeker is not allowed to acces this resources", 400)
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details !!!", 400));
  }

  if ((salaryFrom || salaryTo) && fixedSalary) {
    return next(
      new ErrorHandler("Please provide either fixed salary or ranged salary !!")
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler(
        "cannot enter fixed salary and ranged salary together !!"
      )
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res
    .status(200)
    .json({ success: true, message: "Job created successfully !!", job });
});

// --------------------- get my job

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this resources !")
    );
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({ success: true, myJobs });
});

// ---------------------- update job

// export const updateJob = catchAsyncErrors(async (req, res, next) => {
//   const { role } = req.user;

//   if (role === "Job Seeker") {
//     return next(
//       new ErrorHandler(
//         "Job Seeker is not allowed to access this resources !",
//         400
//       )
//     );
//   }

//   const { id } = req.params;
//   const job = await Job.findById(id);

//   if (!job) {
//     return next(new ErrorHandler("Oops job not found !!", 404));
//   }

//   job = await Job.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     job,
//     message: "Jon Updated Successfully !!",
//   });
// });

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

// ----------------------------------- delete job

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job has been deleted successfully !!",
  });
});

export const getSingleJobDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return new ErrorHandler("Job not found ", 404);
    }
    res.status(200).json({
      success: true,
      job,
      message: "Single job details are here",
    });
  } catch (error) {
    console.log("Error in the single job details function ", error);
    return next(new ErrorHandler("Invalid ID/Cast error ", 400));
  }
});
