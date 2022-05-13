import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EmailConfirm.module.scss";
import Button from "./ui/Button";

const EmailConfirm = ({ data, error }) => {
  const navigator = useNavigate();
  return (
    <div className={classes.EmailConfirm}>
      {error ? (
        <p> {error}</p>
      ) : (
        <p>Your email address has been verified successfully. Thank You</p>
      )}
      <div>
        <Button
          text={error ? "Try To Login again!" : "Click Here To Login"}
          onClick={() => navigator("/", { replace: true })}
        />
      </div>
    </div>
  );
};

export default EmailConfirm;
