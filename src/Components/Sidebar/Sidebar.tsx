import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";

const Sidebar: React.FC = (): JSX.Element => {
   const [activeLink, setActiveLink] = useState<string>(() => "vault");

   const location = useLocation();
   const navigate = useNavigate();

   const handleNavigation = (linkId: string) => {
      switch (linkId) {
         case "vault":
            navigate(appRoutes.vault);
            break;

         case "favorites":
            navigate(appRoutes.favorites);
            break;

         case "generator":
            navigate(appRoutes.passwordGenerator);
            break;

         default:
            navigate(appRoutes.vault);
      }
      setActiveLink(linkId);
   };

   return (
      <>
         {location.pathname === appRoutes.authenticate ? null : (
            <div className={styles.sidebar}>
               <div className={styles.linksWrapper}>
                  <div
                     className={`${styles.linkItem} ${activeLink === "vault" && styles.activeLink}`}
                     onClick={() => handleNavigation("vault")}
                  >
                     <VaultIcon />
                     <span className={styles.linkSpan}>Vault</span>
                  </div>

                  <div
                     className={`${styles.linkItem} ${activeLink === "favorites" && styles.activeLink}`}
                     onClick={() => handleNavigation("favorites")}
                  >
                     <FavoritesIcon />
                     <span className={styles.linkSpan}>Favorites</span>
                  </div>

                  <div
                     className={`${styles.linkItem} ${activeLink === "generator" && styles.activeLink}`}
                     onClick={() => handleNavigation("generator")}
                  >
                     <GenerateIcon />
                     <span className={styles.linkSpan}>Generator</span>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Sidebar;
