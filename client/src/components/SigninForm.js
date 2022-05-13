import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../helpers/axiosInstance";
import classes from "./SigninForm.module.scss";
import Visible from "./ui/Visible";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = Object.fromEntries([...new FormData(e.currentTarget)]);
    try {
      const data = await axiosInstance.post("auth/signin", formdata);
      if (data.status === 205) return navigator("/two-fa");
      navigator("/otp-verify");
    } catch (error) {
      toast.error(error.response.data.message, {
        toastId: "dsauwehnh",
        autoClose: 1000,
      });
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.formControl}>
        <label htmlFor="email-input">Email address</label>
        <input
          type="email"
          name="email"
          id="email-input"
          autoComplete="email"
          autoFocus
          required
          placeholder="Email address"
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="password-input">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password-input"
          autoComplete="current-password"
          required
          placeholder="Password"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className={classes.showPassword}
        >
          {<Visible show={showPassword} />}
        </span>
      </div>
      <div className={classes.remember}>
        <input
          type="checkbox"
          name="remember"
          id="remember-input"
          autoComplete="remember"
        />
        <label htmlFor="remember-input">Remember me</label>
      </div>
      <button type="submit">Login</button>
      <p className={classes.signup}>
        Not a Member? <Link to="/signup">Create an Account</Link>
      </p>
    </form>
  );
};

export default SigninForm;
