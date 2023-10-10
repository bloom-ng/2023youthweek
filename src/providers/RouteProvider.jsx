import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Host from "../pages/Host";
import Guest from "../pages/Guest";
import { AuthContext } from "./AuthProvider";
import Participants from "../pages/Participants";
import Churches from "../pages/Churches";
import Wrapper from "../components/Wrapper";

const RouteProvider = () => {
  const { state } = React.useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" exact element={<Guest />} />
      <Route path="/host" exact element={<Host />} />
      <Route path="/login" exact element={<Login />} />
      {state.token ? (
        <>
        
          <Route path="/participants" exact element={<Wrapper><Participants /></Wrapper> } />
          <Route path="/churches" exact element={<Wrapper><Churches /></Wrapper>} />
        </>
      ) : (
        <Route path="/" exact element={<Home />} />
      )}
      <Route path="*" exact element={<Home />} />

    </Routes>
  );
};

export default RouteProvider;
