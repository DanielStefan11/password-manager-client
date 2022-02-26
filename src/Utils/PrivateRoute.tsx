import React from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";
import { Navigate } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import { getJWT } from "./authorization";

const PrivateRoute: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   return getJWT ? children : <Navigate to={appRoutes.authenticate} />;
};

export default PrivateRoute;
