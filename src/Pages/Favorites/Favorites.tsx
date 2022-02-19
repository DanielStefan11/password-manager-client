import React from "react";
import styles from "./Favorites.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import PasswordItem from "../../Components/PasswordItem/PasswordItem";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import { usePasswordsContext } from "../../Context/PasswordsProvider";

const Favorites: React.FC = (): JSX.Element => {
   // hooks
   const passwordsContext = usePasswordsContext();

   // filteredData
   const filteredPasswords = passwordsContext?.passwords?.filter(password => {
      return password.attributes.favorite === true;
   });

   return (
      <div className={`page ${styles.favorites}`}>
         <PageHeading />

         <div className={styles.list}>
            {filteredPasswords === [] || filteredPasswords === null || filteredPasswords === undefined ? (
               <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <EmptyListImage className="empty-list-image" />
                  <h2 className="text-center">You have not added any favorite passwords</h2>
               </div>
            ) : (
               filteredPasswords.map(password => <PasswordItem key={password.id} password={password} />)
            )}
         </div>
      </div>
   );
};

export default Favorites;
