import React from "react";
import styles from "./MobileMenu.module.scss";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";
import { useLocation, NavLink } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const MobileMenu: React.FC = (): JSX.Element => {
   // hooks
   const location = useLocation();

   return (
      <>
         {location.pathname === appRoutes.authenticate || location.pathname === appRoutes.errorPage ? null : (
            <div className={styles.mobileMenu}>
               <NavLink
                  to={appRoutes.vault}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <VaultIcon />
               </NavLink>

               <NavLink
                  to={appRoutes.favorites}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <FavoritesIcon />
               </NavLink>

               <NavLink
                  to={appRoutes.passwordGenerator}
                  className={navData => (navData.isActive ? styles.activeLink : styles.link)}
               >
                  <GenerateIcon />
               </NavLink>
            </div>
         )}
      </>
   );
};

export default MobileMenu;
