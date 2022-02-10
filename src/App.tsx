import React from "react";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./Utils/appRoutes";
import Authentication from "./Pages/Authentication/Authentication";
import Vault from "./Pages/Vault/Vault";
import LoginProvider from "./Context/LoginProvider";

const App: React.FC = (): JSX.Element => {
   return (
      <div className="app">
         <LoginProvider>
            <Routes>
               <Route path={appRoutes.authenticate} element={<Authentication />} />
               <Route path={appRoutes.vault} element={<Vault />} />
            </Routes>
         </LoginProvider>
      </div>
   );
};

export default App;
