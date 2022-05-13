import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./SignupForm.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visible from "./ui/Visible";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-toastify";

const schema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Please Provide A Valid Email!"),
    password: yup.string().required("Password is required!"),
  })
  .required();

const SignupForm = ({ setShowModle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    lowercase: null,
    uppercase: null,
    special: null,
    number: null,
    min: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const passwordOnChange = (pass) => {
    setPassword(pass);
    setPasswordValid({
      lowercase: /(?=.*[a-z])/.test(pass),
      uppercase: /(?=.*[A-Z])/.test(pass),
      special: /(?=.*[!@#$&*])/.test(pass),
      number: /(?=.*[0-9])/.test(pass),
      min: pass.length >= 8,
    });
  };
  const submitHandler = async (data) => {
    if (Object.values(passwordValid).some((i) => i === false)) return;
    try {
      const response = await axiosInstance.post("auth/signup", data);
      toast.success(response.data.message, {
        toastId: "sk5s56465",
        autoClose: 1000,
      });
      setShowModle(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        toastId: "sk5s56465",
        autoClose: 1000,
      });
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.formControl}>
        <label htmlFor="firstname-input">First Name</label>
        <input
          {...register("firstName")}
          type="firstname"
          name="firstName"
          id="firstname-input"
          autoComplete="first name"
          autoFocus
          required
          placeholder="First Name"
          style={errors.firstName ? { background: "#ffdede" } : {}}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="lastname-input">Last Name</label>
        <input
          {...register("lastName")}
          type="lastname"
          name="lastName"
          id="lastname-input"
          autoComplete="last name"
          autoFocus
          required
          placeholder="Last Name"
          style={errors.lastName ? { background: "#ffdede" } : {}}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="email-input">Email address</label>
        <input
          {...register("email")}
          type="email"
          name="email"
          id="email-input"
          autoComplete="email"
          autoFocus
          required
          placeholder="Email address"
          style={errors.email ? { background: "#ffdede" } : {}}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="password-input">Password</label>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          name="password"
          id="password-input"
          autoComplete="current-password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => passwordOnChange(e.target.value)}
          style={
            Object.values(passwordValid).some((i) => i === false)
              ? { background: "#ffdede" }
              : {}
          }
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className={classes.showPassword}
        >
          {<Visible show={showPassword} />}
        </span>
      </div>
      <div className={classes.passwordStr}>
        <p style={passwordValid.lowercase ? { color: "#389820" } : {}}>
          LowerCase
        </p>
        <p style={passwordValid.uppercase ? { color: "#389820" } : {}}>
          UpperCase
        </p>
        <p style={passwordValid.special ? { color: "#389820" } : {}}>
          Special Characters
        </p>
        <p style={passwordValid.number ? { color: "#389820" } : {}}>Number</p>
        <p style={passwordValid.min ? { color: "#389820" } : {}}>
          Min 8 Characters
        </p>
      </div>
      <button type="submit">Sign Up</button>
      <p className={classes.signup}>
        Have an Account? <Link to="/">Login</Link>
      </p>
    </form>
  );
};

export default SignupForm;
