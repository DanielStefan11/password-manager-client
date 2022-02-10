import React from "react";
import styles from "./Header.module.scss";
import LogoIcon from "../../Assets/Header/logo.png";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const Header: React.FC = (): JSX.Element => {
   const location = useLocation();

   return (
      <>
         {location.pathname === appRoutes.authenticate ? null : (
            <div className={styles.header}>
               <div className={`largeContainer ${styles.content}`}>
                  <div className={styles.logoContainer}>
                     <img src={LogoIcon} alt="logo" className={styles.logoIcon} />
                     <h2 className={`weight-900 size-40 ${styles.logoName}`}>Password Manager</h2>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Header;
