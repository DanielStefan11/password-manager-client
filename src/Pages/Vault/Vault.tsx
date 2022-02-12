import React, { useState } from "react";
import styles from "./Vault.module.scss";
import { FaSortAlphaDown as AtoZIcon, FaSortAlphaDownAlt as ZtoAIcon } from "react-icons/fa";
import { BsPlusLg as PlusIcon } from "react-icons/bs";
import AddPassword from "../../Components/AddPassword/AddPassword";

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
   const [showAddModal, setShowAddModal] = useState<boolean>(() => false);

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

   const toggleAddModal = () => setShowAddModal(!showAddModal);

   return (
      <div className={`page ${styles.vaultPage}`}>
         <AddPassword show={showAddModal} toggleModal={toggleAddModal} />

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

         <div className={styles.addButton} onClick={toggleAddModal}>
            <PlusIcon />
         </div>
      </div>
   );
};

export default Vault;
