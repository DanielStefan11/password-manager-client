import React from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";
import { Navigate } from "react-router-dom";
import { appRoutes } from "./appRoutes";

const PrivateRoute: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const jwtValue = sessionStorage.getItem("jwt");

   return jwtValue ? children : <Navigate to={appRoutes.authenticate} />;
};

export default PrivateRoute;
