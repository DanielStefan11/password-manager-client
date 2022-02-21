import React from "react";
import styles from "./Sidebar.module.scss";
import { useLocation, NavLink } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon, AiFillSetting as SettingsIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";

const Sidebar: React.FC = (): JSX.Element => {
   // hooks
   const location = useLocation();

   return (
      <>
         {location.pathname === appRoutes.authenticate || location.pathname === appRoutes.errorPage ? null : (
            <div className={styles.sidebar}>
               <div className={styles.linksWrapper}>
                  <NavLink
                     to={appRoutes.vault}
                     className={navData => (navData.isActive ? styles.activeLink : styles.linkItem)}
                  >
                     <VaultIcon />
                     <span className={styles.linkSpan}>Vault</span>
                  </NavLink>

                  <NavLink
                     to={appRoutes.favorites}
                     className={navData => (navData.isActive ? styles.activeLink : styles.linkItem)}
                  >
                     <FavoritesIcon />
                     <span className={styles.linkSpan}>Favorites</span>
                  </NavLink>

                  <NavLink
                     to={appRoutes.passwordGenerator}
                     className={navData => (navData.isActive ? styles.activeLink : styles.linkItem)}
                  >
                     <GenerateIcon />
                     <span className={styles.linkSpan}>Generator</span>
                  </NavLink>

                  <NavLink
                     to={appRoutes.settings}
                     className={navData => (navData.isActive ? styles.activeLink : styles.linkItem)}
                  >
                     <SettingsIcon />
                     <span className={styles.linkSpan}>Settings</span>
                  </NavLink>
               </div>
            </div>
         )}
      </>
   );
};

export default Sidebar;
