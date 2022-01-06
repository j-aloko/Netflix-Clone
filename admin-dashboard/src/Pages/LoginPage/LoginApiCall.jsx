import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../../Context/Auth/AuthActions";
import axiosInstance from "./../../axios";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
