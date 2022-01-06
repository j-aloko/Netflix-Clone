export const userLoginStart = () => ({
  type: "LOGIN_START",
});

export const userLoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const userLoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});
