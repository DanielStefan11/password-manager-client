import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";
import { appRoutes } from "./Utils/appRoutes";

const App: React.FC = (): JSX.Element => {
   return (
      <div className="app">
         <Routes>
            <Route path={appRoutes.authenticate} element={<Authentication />} />
         </Routes>
      </div>
   );
};

export default App;
