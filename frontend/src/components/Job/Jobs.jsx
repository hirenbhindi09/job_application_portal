import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/v1/job/getalljobs", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log("Error in the fetch job function :-", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  console.log("JObs are :--", jobs);
  if (!isAuthorized) {
    navigate("/login");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>All Available Jobs</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs?.jobs?.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
