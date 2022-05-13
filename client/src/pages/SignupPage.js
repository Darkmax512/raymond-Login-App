import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import VerifyEmail from "../components/VerifyEmail";

const SignupPage = () => {
  const [showModle, setShowModle] = useState(false);
  return (
    <>
      <SignupForm setShowModle={setShowModle} />
      {showModle && <VerifyEmail />}
    </>
  );
};

export default SignupPage;
