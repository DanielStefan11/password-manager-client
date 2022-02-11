import React from "react";
import styles from "./MobileMenu.module.scss";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const MobileMenu: React.FC = (): JSX.Element => {
   const location = useLocation();
   const navigate = useNavigate();

   const handleNavigation = (linkId: string) => {
      switch (linkId) {
         case appRoutes.vault:
            navigate(appRoutes.vault);
            break;

         case appRoutes.favorites:
            navigate(appRoutes.favorites);
            break;

         case appRoutes.passwordGenerator:
            navigate(appRoutes.passwordGenerator);
            break;

         default:
            navigate(appRoutes.vault);
      }
   };

   return (
      <>
         {location.pathname === appRoutes.authenticate ? null : (
            <div className={styles.mobileMenu}>
               <div className={styles.link} onClick={() => handleNavigation(appRoutes.vault)}>
                  <VaultIcon />
               </div>

               <div className={styles.link} onClick={() => handleNavigation(appRoutes.favorites)}>
                  <FavoritesIcon />
               </div>

               <div className={styles.link} onClick={() => handleNavigation(appRoutes.passwordGenerator)}>
                  <GenerateIcon />
               </div>
            </div>
         )}
      </>
   );
};

export default MobileMenu;
