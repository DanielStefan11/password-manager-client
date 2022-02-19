import React, { useState } from "react";
import styles from "./Header.module.scss";
import LogoIcon from "../../Assets/Header/logo.png";
import UserIcon from "../../Assets/Header/user.png";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import UserMenu from "../UserMenu/UserMenu";

const Header: React.FC = (): JSX.Element => {
   // state
   const [showUserMenu, setShowUserMenu] = useState<boolean>(() => false);

   // other hooks
   const location = useLocation();

   // functions
   const handleToggleMenu = () => setShowUserMenu(!showUserMenu);

   return (
      <>
         {location.pathname === appRoutes.authenticate ? null : (
            <div className={styles.header}>
               <div className={`largeContainer ${styles.content}`}>
                  <div className={styles.logoContainer}>
                     <img src={LogoIcon} alt="logo" className={styles.logoIcon} />

                     <h2 className={`weight-900 size-40 ${styles.logoNameDesktop}`}>Password Manager</h2>

                     <h2 className={styles.logoNameMobile}>{location.pathname.substring(1).toUpperCase()}</h2>
                  </div>

                  <div className={styles.dropdownContainer}>
                     <img src={UserIcon} alt="user" className={styles.userIcon} onClick={handleToggleMenu} />

                     <UserMenu show={showUserMenu} toggle={handleToggleMenu} />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Header;
