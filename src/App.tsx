import React from "react";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./Utils/appRoutes";
import Authentication from "./Pages/Authentication/Authentication";
import PrivateRoute from "./Utils/PrivateRoute";
import Vault from "./Pages/Vault/Vault";
import { ToastContainer } from "react-toastify";

const App: React.FC = (): JSX.Element => {
   return (
      <div className="app">
         <ToastContainer
            position="top-center"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            closeButton={true}
         />

         <Routes>
            <Route path={appRoutes.authenticate} element={<Authentication />} />
            <Route
               path={appRoutes.vault}
               element={
                  <PrivateRoute>
                     <Vault />
                  </PrivateRoute>
               }
            />
         </Routes>
      </div>
   );
};

export default App;
