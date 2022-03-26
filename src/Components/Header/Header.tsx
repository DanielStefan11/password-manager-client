import React, { useState } from "react";
import styles from "./Header.module.scss";
import LogoIcon from "../../Assets/Header/logo.png";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { BiLogOutCircle as LogoutIcon } from "react-icons/bi";
import LogoutConfirmation from "../LogoutConfirmation/LogoutConfirmation";

const Header: React.FC = (): JSX.Element => {
   // state
   const [logoutModal, setLogoutModal] = useState<boolean>(() => false);

   // hooks
   const location = useLocation();
   const darkModeContext = useDarkModeContext();

   // functions
   const handleLogoutModal = (): void => setLogoutModal(!logoutModal);

   return (
      <>
         {/* modals */}
         <LogoutConfirmation show={logoutModal} toggleModal={handleLogoutModal} />

         {location.pathname === appRoutes.authenticate || location.pathname === appRoutes.errorPage ? null : (
            <div
               className={`darkModeTransition ${styles.header} ${
                  darkModeContext?.darkMode ? styles.headerDarkMode : styles.headerLightMode
               }`}
            >
               <div className={`largeContainer ${styles.content}`}>
                  <div className={styles.logoContainer}>
                     <img src={LogoIcon} alt="logo" className={styles.logoIcon} />

                     <h2
                        className={`weight-900 size-40 ${styles.logoNameDesktop} ${
                           darkModeContext?.darkMode ? styles.logoNameDesktopDM : styles.logoNameDesktopLM
                        }`}
                     >
                        Password Manager
                     </h2>

                     <h2
                        className={`${styles.logoNameMobile} ${
                           darkModeContext?.darkMode ? styles.logoNameDesktopDM : styles.logoNameDesktopLM
                        }`}
                     >
                        {location.pathname.substring(1).toUpperCase()}
                     </h2>
                  </div>

                  <LogoutIcon className={styles.logoutIcon} onClick={handleLogoutModal} />
               </div>
            </div>
         )}
      </>
   );
};

export default Header;
