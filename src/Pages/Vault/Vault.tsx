import React, { useState, useRef } from "react";
import styles from "./Vault.module.scss";
import { FaSortAlphaDown as AtoZIcon, FaSortAlphaDownAlt as ZtoAIcon, FaSearch as SearchIcon } from "react-icons/fa";
import { BsPlusLg as PlusIcon, BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { FiRefreshCcw as RefreshIcon } from "react-icons/fi";
import { IoIosClose as DeleteIcon } from "react-icons/io";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import PageHeading from "../../Components/PageHeading/PageHeading";
import CreatePassword from "../../Components/CreatePassword/CreatePassword";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { usePasswordsContext } from "../../Context/PasswordsProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface SortIcons {
   AtoZ: boolean;
   ZtoA: boolean;
}

const Vault: React.FC = (): JSX.Element => {
   // state
   const [sortIcons, setSortIcons] = useState<SortIcons>(() => {
      return {
         AtoZ: true,
         ZtoA: false,
      };
   });
   const [showAddModal, setShowAddModal] = useState<boolean>(() => false);
   const [search, setSearch] = useState<string>(() => "");
   const [clearSearch, setClearSearch] = useState<boolean>(() => false);

   // refs
   const searchRef = useRef<HTMLInputElement>(null);

   // hooks
   const passwordsContext = usePasswordsContext();
   const darkModeContext = useDarkModeContext();

   // filteredData
   const filteredPasswords = passwordsContext?.passwords?.filter(password => {
      return password.attributes.title.toLowerCase().includes(search.toLowerCase());
   });

   // functions
   const handleSortIcons = (iconId: string) => {
      switch (iconId) {
         case "a-z":
            setSortIcons({ AtoZ: true, ZtoA: false });
            passwordsContext?.fetchPwdAscending();
            break;

         case "z-a":
            setSortIcons({ AtoZ: false, ZtoA: true });
            passwordsContext?.sortPwdDescending();
            break;

         default:
            setSortIcons({ AtoZ: true, ZtoA: false });
            passwordsContext?.fetchPwdAscending();
      }
   };

   const toggleAddModal = () => setShowAddModal(!showAddModal);

   const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
      setClearSearch(true);
   };

   const handleClearSearch = () => {
      setSearch("");
      setClearSearch(false);
      searchRef.current?.focus();
   };

   return (
      <div
         className={`page darkModeTransition ${styles.vaultPage} ${
            darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"
         }`}
      >
         <CreatePassword show={showAddModal} toggleModal={toggleAddModal} />

         <PageHeading />

         {/* Filters */}
         <div className={styles.filtersContainer}>
            <div className={styles.searchContainer}>
               <SearchIcon className={styles.inputIcons} />
               <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  className={`shadow ${styles.search} ${
                     darkModeContext?.darkMode ? "elementBgDarkMode" : styles.searchBackground
                  }`}
                  placeholder="Search..."
                  onChange={e => handleSearch(e)}
               />
               {clearSearch && <DeleteIcon className={styles.deleteIcon} onClick={handleClearSearch} />}
            </div>

            <div className={styles.actionsWrapper}>
               <div className={styles.refresh} onClick={passwordsContext?.fetchPwdAscending}>
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

         {/* Password List */}
         <div className={styles.list}>
            {filteredPasswords === [] ||
            filteredPasswords === null ||
            filteredPasswords === undefined ||
            filteredPasswords?.length === 0 ? (
               <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <EmptyListImage className="empty-list-image" />
                  <h2 className={`text-center ${darkModeContext?.darkMode && "text-white"}`}>
                     You have not added any passwords
                  </h2>
               </div>
            ) : (
               filteredPasswords.map(password => <PasswordItem key={password.id} password={password} />)
            )}
         </div>

         {/* Add Password */}
         <div className={`shadow ${styles.addButton}`} onClick={toggleAddModal}>
            <PlusIcon />
         </div>
      </div>
   );
};

export default Vault;
