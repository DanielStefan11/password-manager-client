import React from "react";
import styles from "./Favorites.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import { useFavoritesContext } from "../../Context/FavoritesProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import FadeLoader from "react-spinners/FadeLoader";

const Favorites: React.FC = (): JSX.Element => {
   // hooks
   const favoritesContext = useFavoritesContext();
   const darkModeContext = useDarkModeContext();

   return (
      <div
         className={`page darkModeTransition ${styles.favorites} ${
            darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"
         }`}
      >
         <PageHeading />

         {favoritesContext?.loading ? (
            <div className={`loadingContainer`}>
               <FadeLoader height={30} color="#33cccc" />
               <h5 className="mt-4 size-26 weight-700 primary-blue-text">Loading...</h5>
            </div>
         ) : (
            <div className={styles.list}>
               {favoritesContext?.favorites === [] ||
               favoritesContext?.favorites === null ||
               favoritesContext?.favorites === undefined ||
               favoritesContext?.favorites.length === 0 ? (
                  <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                     <EmptyListImage className="empty-list-image" />
                     <h2 className={`text-center ${darkModeContext?.darkMode && "text-white"}`}>
                        You have not added any favorite passwords
                     </h2>
                  </div>
               ) : (
                  favoritesContext?.favorites.map(password => <PasswordItem key={password.id} password={password} />)
               )}
            </div>
         )}
      </div>
   );
};

export default Favorites;
