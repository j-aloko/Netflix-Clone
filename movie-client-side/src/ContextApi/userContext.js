import { createContext, useEffect, useReducer } from "react";
import { userReducer } from "./UserReducer";

const userInitialState = {
  user: JSON.parse(localStorage.getItem("netflix")) || null,
  isFetching: false,
  success: false,
  isError: false,
};

export const userContext = createContext(userInitialState);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  useEffect(() => {
    localStorage.setItem("netflix", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <userContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        success: state.success,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
