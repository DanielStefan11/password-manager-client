import React, { useState } from "react";
import styles from "./Vault.module.scss";
import { FaSortAlphaDown as AtoZIcon, FaSortAlphaDownAlt as ZtoAIcon, FaSearch as SearchIcon } from "react-icons/fa";
import { BsPlusLg as PlusIcon } from "react-icons/bs";
import { FiRefreshCcw as RefreshIcon } from "react-icons/fi";
import AddPassword from "../../Components/AddPassword/AddPassword";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { usePasswordsContext } from "../../Context/PasswordsProvider";

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

   const passwordsContext = usePasswordsContext();

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

   console.log("in vault: ", passwordsContext);

   return (
      <div className={`pb-5 page ${styles.vaultPage}`}>
         <AddPassword show={showAddModal} toggleModal={toggleAddModal} />

         <div className={styles.filtersContainer}>
            <div className={styles.searchContainer}>
               <SearchIcon className={styles.inputIcons} />
               <input type="text" className={`shadow ${styles.search}`} placeholder="Search..." />
            </div>

            <div className={styles.actionsWrapper}>
               <div className={styles.refresh}>
                  <RefreshIcon />
                  <span>Refresh</span>
               </div>

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

         <div className={styles.list}>
            {passwordsContext === [] || passwordsContext === null || passwordsContext === undefined ? (
               <h2>You have not added any passwords</h2>
            ) : (
               passwordsContext.map(password => <PasswordItem key={password.id} password={password} />)
            )}
         </div>

         <div className={`shadow ${styles.addButton}`} onClick={toggleAddModal}>
            <PlusIcon />
         </div>
      </div>
   );
};

export default Vault;
