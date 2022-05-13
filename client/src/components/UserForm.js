import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import { userActions } from "../store/userSlice";
import Button from "./ui/Button";
import classes from "./UserForm.module.scss";

const UserForm = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const removeToken = useCookies(["token"])[2];
  const checkHandler = async () => {
    axiosInstance.get("/auth/validate").catch((error) => {
      if (error.response.status === 401) {
        dispatch(userActions.setUser(null));
      }
    });
  };
  const logoutHandler = () => {
    removeToken("token");
    dispatch(userActions.setUser(null));
  };
  return (
    <div className={classes.user}>
      <h2>
        Wellcome {user?.firstName} {user?.lastName}
      </h2>
      <div>
        <Button text="Test You Token Session" onClick={checkHandler} />
      </div>
      <button className={classes.logout} onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default UserForm;
