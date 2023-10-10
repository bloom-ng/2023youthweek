/* eslint-disable react/prop-types */
import React, { useReducer } from "react";

export const AuthContext = React.createContext();

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", "Admin");
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  React.useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token != "undefined" && token != null) {
    //   dispatch({
    //     type: "LOGIN",
    //     payload: {
    //       user: localStorage.getItem("user"),
    //       token,
    //     },
    //   });
    // }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
