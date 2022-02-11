import React, { useState } from "react";
import styles from "./Vault.module.scss";
import { FaSortAlphaDown as AtoZIcon, FaSortAlphaDownAlt as ZtoAIcon } from "react-icons/fa";

interface SortIcons {
   AtoZ: boolean;
   ZtoA: boolean;
}

const Vault: React.FC = (): JSX.Element => {
   const [sortIcons, setSortIcons] = useState<SortIcons>(() => {
      return {
         AtoZ: true,
         ZtoA: false,
      };
   });

   const handleSortIcons = (iconId: string) => {
      switch (iconId) {
         case "a-z":
            setSortIcons({ AtoZ: true, ZtoA: false });
            break;

         case "z-a":
            setSortIcons({ AtoZ: false, ZtoA: true });
            break;

         default:
            setSortIcons({ AtoZ: true, ZtoA: false });
      }
   };

   return (
      <div className={`page`}>
         <div className={styles.filtersContainer}>
            <input type="text" className={styles.search} placeholder="Search..." />

            <div className={styles.sortContainer}>
               <AtoZIcon
                  className={`${styles.sortIcons} ${sortIcons.AtoZ && styles.activeSortIcon}`}
                  onClick={() => handleSortIcons("a-z")}
               />

               <ZtoAIcon
                  className={`${styles.sortIcons} ${sortIcons.ZtoA && styles.activeSortIcon}`}
                  onClick={() => handleSortIcons("z-a")}
               />
            </div>
         </div>
      </div>
   );
};

export default Vault;
