import React, { useContext, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {} = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { password, email, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigate("/");
      setPassword("");
      setEmail("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.log("Error inn the register function :", error);

      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  }
  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Login your account</h3>
        </div>

        <form>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>

              <FaRegUser />
            </div>
          </div>

          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hiren@gmail.com"
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  );
};

export default Login;
