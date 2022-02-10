import React, { useState, useContext } from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";

interface Logged {
   loginStatus: boolean;
   globalLogin: () => void;
}

const LoginContext = React.createContext<Logged | null>(null);

export const useLoginContext = () => useContext(LoginContext);

const LoginProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [loginStatus, setLoginStatus] = useState<boolean>(() => false);

   const globalLogin = (): void => setLoginStatus(true);

   const state: Logged = {
      loginStatus,
      globalLogin,
   };

   return <LoginContext.Provider value={state}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
