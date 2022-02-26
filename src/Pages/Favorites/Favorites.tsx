import React from "react";
import styles from "./Favorites.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import { useFavoritesContext } from "../../Context/FavoritesProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

const Favorites: React.FC = (): JSX.Element => {
   // hooks
   const favoritesContext = useFavoritesContext();
   const darkModeContext = useDarkModeContext();

   // filteredData
   const filteredPasswords = favoritesContext?.favorites?.filter(password => {
      return password.attributes.favorite === true;
   });

   return (
      <div
         className={`page darkModeTransition ${styles.favorites} ${
            darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"
         }`}
      >
         <PageHeading />

         <div className={styles.list}>
            {filteredPasswords === [] ||
            filteredPasswords === null ||
            filteredPasswords === undefined ||
            filteredPasswords.length === 0 ? (
               <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <EmptyListImage className="empty-list-image" />
                  <h2 className={`text-center ${darkModeContext?.darkMode && "text-white"}`}>
                     You have not added any favorite passwords
                  </h2>
               </div>
            ) : (
               filteredPasswords.map(password => <PasswordItem key={password.id} password={password} />)
            )}
         </div>
      </div>
   );
};

export default Favorites;
