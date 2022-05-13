import React from "react";
import classes from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.bounce1}></div>
      <div className={classes.bounce2}></div>
    </div>
  );
};

export default Loading;
