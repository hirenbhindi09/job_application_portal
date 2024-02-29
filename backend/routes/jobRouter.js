import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJobDetails,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getalljobs", isAuthorized, getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getMyJobs);
router.get("/getsinglejobdetail/:id", isAuthorized, getSingleJobDetails);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
export default router;
