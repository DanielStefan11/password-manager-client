import React from "react";
import styles from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const Sidebar: React.FC = (): JSX.Element => {
   const location = useLocation();

   return (
      <>
         {location.pathname === appRoutes.authenticate ? null : (
            <div className={styles.sidebar}>
               <div className={styles.linksWrapper}>
                  <div className={styles.linkItem}>
                     <span>Vault</span>
                  </div>

                  <div className={styles.linkItem}>
                     <span>Favorites</span>
                  </div>

                  <div className={styles.linkItem}>
                     <span>Generator</span>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Sidebar;
