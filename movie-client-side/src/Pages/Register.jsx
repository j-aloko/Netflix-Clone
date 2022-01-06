import React, { useState, useRef } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { userRegistration } from "./../ContextApi/ApiCalls/UserApi";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    const userInfo = {
      email,
      password,
    };
    userRegistration(userInfo);
    history.push("/login");
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
            alt="netflix logo circle png"
            className="logo"
          />
          <Link to="/login" className="link">
            <button className="loginxButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited Movies, TV shows, & More</h1>
        <h2>Watch anywhere. cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              placeholder="input your password"
              ref={passwordRef}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start Membership
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
