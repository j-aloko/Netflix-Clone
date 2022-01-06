import React, { useContext } from "react";
import "./Login.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { userContext } from "./../ContextApi/userContext";
import { userLogin } from "../ContextApi/ApiCalls/UserApi";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email field required"),
  password: Yup.string().required("Password field required"),
});

const Login = () => {
  const history = useHistory();
  const { dispatch, isSuccess, isFetching, error } = useContext(userContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      userLogin(values, dispatch);
      if (isSuccess) {
        history.push("/");
      }
    },
    validationSchema,
  });
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
            alt="netflix logo circle png"
            className="logo"
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <h1>Sign In</h1>
          <div className="inputItem">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="inputItem">
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="loginButton" type="submit" disabled={isFetching}>
            Sign In
          </button>
          {error && (
            <>
              <span
                className="errorMessage"
                style={{ color: "red", fontWeight: "bold" }}
              >
                Wrong email or password
              </span>
            </>
          )}
          <span>
            New to Netflix?{" "}
            <Link to="/register" className="link">
              <b>Sign up now</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
