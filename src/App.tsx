import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./Utils/appRoutes";
import Authentication from "./Pages/Authentication/Authentication";
import PrivateRoute from "./Utils/PrivateRoute";
import Vault from "./Pages/Vault/Vault";
import Favorites from "./Pages/Favorites/Favorites";
import PasswordGenerator from "./Pages/PasswordGenerator/PasswordGenerator";
import Settings from "./Pages/Settings/Settings";
import ErrorPage from "./Pages/Error/ErrorPage";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import MobileMenu from "./Components/MobileMenu/MobileMenu";
import UserInfoProvider from "./Context/UserInfoProvider";
import PasswordsProvider from "./Context/PasswordsProvider";
import FavoritesProvider from "./Context/FavoritesProvider";
import DarkModeProvider from "./Context/DarkModeProvider";

const App: React.FC = (): JSX.Element => {
   return (
      <UserInfoProvider>
         <PasswordsProvider>
            <FavoritesProvider>
               <DarkModeProvider>
                  <div className={`app`}>
                     {/* Global components */}
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

                     <Header />
                     <Sidebar />
                     <MobileMenu />

                     {/* Routes */}
                     <Routes>
                        {/* Authenticate/Login */}
                        <Route path={appRoutes.authenticate} element={<Authentication />} />

                        {/* Vault */}
                        <Route
                           path={appRoutes.vault}
                           element={
                              <PrivateRoute>
                                 <Vault />
                              </PrivateRoute>
                           }
                        />

                        {/* Favorites */}
                        <Route
                           path={appRoutes.favorites}
                           element={
                              <PrivateRoute>
                                 <Favorites />
                              </PrivateRoute>
                           }
                        />

                        {/* Password generator */}
                        <Route
                           path={appRoutes.passwordGenerator}
                           element={
                              <PrivateRoute>
                                 <PasswordGenerator />
                              </PrivateRoute>
                           }
                        />

                        {/* Settings */}
                        <Route
                           path={appRoutes.settings}
                           element={
                              <PrivateRoute>
                                 <Settings />
                              </PrivateRoute>
                           }
                        />

                        {/* Error page */}
                        <Route path={appRoutes.errorPage} element={<ErrorPage />} />
                        <Route path="*" element={<Navigate to={appRoutes.errorPage} />} />
                     </Routes>
                  </div>
               </DarkModeProvider>
            </FavoritesProvider>
         </PasswordsProvider>
      </UserInfoProvider>
   );
};

export default App;
