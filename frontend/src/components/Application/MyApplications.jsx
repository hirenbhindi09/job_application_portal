import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [application, setApplication] = useState([]);
  const [modal, setModal] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { user, isAuthorized } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => setApplication(res.data.applications));
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => setApplication(res.data.applications));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigate("/login");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then(
          (res) => toast.success(res.data.message),
          setApplication((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          )
        );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h3>My Applications</h3>
            {application.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element.key}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })}
          </div>
        ) : (
          <div className="container">
            <h3>Applications from Job Seekers</h3>
            {application.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element.key}
                  openModal={openModal}
                />
              );
            })}
          </div>
        )}

        {modal && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name :</span> {element.name}
          </p>
          <p>
            <span>Email :</span> {element.email}
          </p>
          <p>
            <span>Phone :</span> {element.phone}
          </p>
          <p>
            <span>Address :</span> {element.address}
          </p>
          <p>
            <span>Cover Letter :</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name :</span> {element.name}
          </p>
          <p>
            <span>Email :</span> {element.email}
          </p>
          <p>
            <span>Phone :</span> {element.phone}
          </p>
          <p>
            <span>Address :</span> {element.address}
          </p>
          <p>
            <span>Cover Letter :</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
