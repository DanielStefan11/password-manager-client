import React from "react";
import styles from "./MobileMenu.module.scss";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon, AiFillSetting as SettingsIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";
import { FaStickyNote as NotesIcon } from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

const MobileMenu: React.FC = (): JSX.Element => {
   // hooks
   const location = useLocation();
   const darkModeContext = useDarkModeContext();

   return (
      <>
         {location.pathname === appRoutes.authenticate || location.pathname === appRoutes.errorPage ? null : (
            <div
               className={`${styles.mobileMenu} ${
                  darkModeContext?.darkMode ? styles.menuDarkMode : styles.menuLightMode
               }`}
            >
               {/* vault */}
               <NavLink
                  to={appRoutes.vault}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <VaultIcon />
               </NavLink>

               {/* favorites */}
               <NavLink
                  to={appRoutes.favorites}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <FavoritesIcon />
               </NavLink>

               {/* notes */}
               <NavLink
                  to={appRoutes.notes}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <NotesIcon />
               </NavLink>

               {/* generate */}
               <NavLink
                  to={appRoutes.passwordGenerator}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <GenerateIcon />
               </NavLink>

               {/* settings */}
               <NavLink
                  to={appRoutes.settings}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <SettingsIcon />
               </NavLink>
            </div>
         )}
      </>
   );
};

export default MobileMenu;
