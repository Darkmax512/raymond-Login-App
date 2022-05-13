import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../helpers/axiosInstance";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, errors: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.errors = null;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const getUser = (otp) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.patch("auth/verify-2fa", {
        token: otp,
      });
      dispatch(userActions.setUser(response.data));
    } catch (error) {
      // dispatch(userActions.setErrors({ message: error.response.data.message }));
      toast.error(error.response.data.message, {
        toastId: "54sdaiousd",
        autoClose: 1000,
      });
    }
  };
};

export default userSlice.reducer;
