import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import classes from "./VerifyEmail.module.scss";

const VerifyEmail = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className={classes.overlay} />
      <div className={classes.verifyEmail}>
        <h2>Please check your email for confirmation</h2>
        <Button text="OK" onClick={() => navigator("/")} />
      </div>
    </>
  );
};

export default VerifyEmail;
