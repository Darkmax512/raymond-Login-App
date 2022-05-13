import React from "react";
import { ReactComponent as Show } from "../../assets/eye.svg";
import { ReactComponent as Hide } from "../../assets/eye-blocked.svg";

const Visible = ({ show }) => {
  return <>{show ? <Hide /> : <Show />}</>;
};

export default Visible;
