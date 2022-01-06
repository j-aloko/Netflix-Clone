export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        success: false,
        isError: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        success: true,
        isError: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        success: false,
        isError: true,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};
