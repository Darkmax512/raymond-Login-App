import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import classes from "./QRCodeForm.module.scss";
import Button from "./ui/Button";

const QRCodeForm = () => {
  const [QRImage, setQRImage] = useState();
  const navigator = useNavigate();
  useEffect(() => {
    axiosInstance
      .patch("auth/set-2fa")
      .then((res) => setQRImage(res.data.qrImage));
  }, []);
  return (
    <section className={classes.form}>
      <p>
        In order to protect your account from unauthorized access, we require
        both a password and permission of your phone to access your account.
        Please install microsoft authenticator through the following steps for
        us to verify that you have permission of your phone.
      </p>
      <ol className={classes.list}>
        <li>
          Install the Microsoft Authenticator App from Ios App Store/Android
          Play Store.
        </li>
        <li>Open the Microsoft Authenticator App.</li>
        <li>Click I agree for permission to use the app.</li>
        <li>Click Scan a QR Code.</li>
        <li>Scan the image below.</li>
      </ol>
      <div className={classes.qrHolder}>
        <img src={QRImage} alt="QR-Code Ready for scan" />
      </div>
      <p className={classes.finish}>
        When Microsoft Authenticator App display a six-digit code, Click the
        continue button below.
      </p>
      <div>
        <Button text={"Continue"} onClick={() => navigator("/otp-verify")} />
      </div>
    </section>
  );
};

export default QRCodeForm;
