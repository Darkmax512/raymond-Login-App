import React from "react";
import classes from "./Button.module.scss";

const Button = ({ text, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
