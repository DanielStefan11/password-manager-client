import React, { useState, useRef } from "react";
import styles from "./Vault.module.scss";
import { FaSortAlphaDown as AtoZIcon, FaSortAlphaDownAlt as ZtoAIcon, FaSearch as SearchIcon } from "react-icons/fa";
import { BsPlusLg as PlusIcon } from "react-icons/bs";
import { FiRefreshCcw as RefreshIcon } from "react-icons/fi";
import { IoIosClose as DeleteIcon } from "react-icons/io";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import PageHeading from "../../Components/PageHeading/PageHeading";
import CreatePassword from "../../Components/CreatePassword/CreatePassword";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { usePasswordsContext } from "../../Context/PasswordsProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import Pagination from "../../Components/Pagination/Pagination";
import FadeLoader from "react-spinners/FadeLoader";

const Vault: React.FC = (): JSX.Element => {
   // state
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
      if (iconId === "a-z") return passwordsContext?.sortPwdAscending();
      if (iconId === "z-a") return passwordsContext?.sortPwdDescending();
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
                  className={`shadow highlightInput ${styles.search} ${
                     darkModeContext?.darkMode ? "elementBgDarkMode" : styles.searchBackground
                  }`}
                  placeholder="Search..."
                  onChange={e => handleSearch(e)}
               />
               {clearSearch && <DeleteIcon className={styles.deleteIcon} onClick={handleClearSearch} />}
            </div>

            <div className={styles.actionsWrapper}>
               <div className={styles.refresh} onClick={() => passwordsContext?.refreshData()}>
                  <RefreshIcon />
                  <span>Refresh</span>
               </div>

               <div className={styles.sortContainer}>
                  <AtoZIcon className={`${styles.sortIcons}`} onClick={() => handleSortIcons("a-z")} />

                  <ZtoAIcon className={`${styles.sortIcons}`} onClick={() => handleSortIcons("z-a")} />
               </div>
            </div>
         </div>

         {/* Password List */}
         {passwordsContext?.loading ? (
            <div className={`loadingContainer`}>
               <FadeLoader height={30} color="#33cccc" />
               <h5 className="mt-4 size-26 weight-700 primary-blue-text">Loading...</h5>
            </div>
         ) : (
            <div className={styles.list}>
               {filteredPasswords === [] ||
               filteredPasswords === null ||
               filteredPasswords === undefined ||
               filteredPasswords.length === 0 ? (
                  <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                     <EmptyListImage className="empty-list-image" />
                     <h2 className={`text-center ${darkModeContext?.darkMode && "text-white"}`}>
                        You have not added any passwords
                     </h2>
                  </div>
               ) : (
                  <>
                     {/* Top Pagination */}
                     {!passwordsContext?.enableSorting && (
                        <div className={styles.paginationSM}>
                           <Pagination />
                        </div>
                     )}

                     {filteredPasswords.map(password => (
                        <PasswordItem key={password.id} password={password} />
                     ))}

                     {/* Bottom Pagination */}
                     {!passwordsContext?.enableSorting && (
                        <div className={styles.paginationLG}>
                           <Pagination />
                        </div>
                     )}
                  </>
               )}
            </div>
         )}

         {/* Add Password */}
         <div className={`shadow addButton`} onClick={toggleAddModal}>
            <PlusIcon />
         </div>
      </div>
   );
};

export default Vault;
