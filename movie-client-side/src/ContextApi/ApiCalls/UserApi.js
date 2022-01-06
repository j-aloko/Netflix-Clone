import {
  logout,
  userLoginSuccess,
  userLoginStart,
  userLoginFailure,
} from "./../UserActions";
import axiosInstance from "./../../axios";

//Register
export const userRegistration = async (userInfo) => {
  try {
    await axiosInstance.post("auth/register", userInfo);
  } catch (error) {
    console.log(error);
  }
};

//Login
export const userLogin = async (values, dispatch) => {
  dispatch(userLoginStart());
  try {
    const res = await axiosInstance.post("auth/login", values);
    dispatch(userLoginSuccess(res.data));
  } catch (error) {
    dispatch(userLoginFailure());
  }
};

//Logout
export const Logout = (dispatch) => {
  dispatch(logout());
};
