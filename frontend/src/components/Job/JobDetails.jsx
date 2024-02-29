import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState({});

  const navigate = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  const getJobDetails = async () => {
    try {
      await axios
        .get(`http://localhost:4000/api/v1/job/getsinglejobdetail/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.job);
        });
    } catch (error) {
      console.log(
        "Error in the fetching job details API ",
        error.response.data.message
      );
    }
  };
  useEffect(() => {
    getJobDetails();
  }, []);
  console.log("JOBS ARE :--", jobs);
  if (!isAuthorized) {
    navigate("/login");
  }
  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title <span>{jobs.title}</span>
            </p>
            <p>
              Category <span>{jobs.category}</span>
            </p>
            <p>
              Country <span>{jobs.country}</span>
            </p>
            <p>
              City <span>{jobs.city}</span>
            </p>
            <p>
              Location <span>{jobs.location}</span>
            </p>
            <p>
              Description <span>{jobs.description}</span>
            </p>
            <p>
              Job Posted On <span>{jobs.jobPostedOn}</span>
            </p>
            <p>
              Salary:{" "}
              {jobs.fixedSalary ? (
                <span>{jobs.fixedSalary}</span>
              ) : (
                <span>
                  {jobs.salaryFrom} - {jobs.salaryTo}
                </span>
              )}
            </p>
            <p>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <>
                  <Link to={`/application/${jobs._id}`}>Apply now</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
