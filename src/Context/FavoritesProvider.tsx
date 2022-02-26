import React, { useState, useContext, useEffect } from "react";
import { Password, ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured } from "../Utils/notifications";
import { headersObject, getJWT } from "../Utils/authorization";

interface IFavoritesContext {
   favorites: Password[] | null;
   refreshFavorites: () => Promise<void>;
}

const FavoritesContext = React.createContext<IFavoritesContext | null>(null);

export const useFavoritesContext = () => useContext(FavoritesContext);

const FavoritesProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [favorites, setFavorites] = useState<Password[] | null>(() => null);

   const refreshFavorites = async (): Promise<void> => {
      try {
         const result = await axios.get(
            process.env.REACT_APP_PASSWORD_MANAGER_URL +
               `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:asc`,
            headersObject
         );
         setFavorites(result.data.data);
      } catch (err) {
         toast.error(errorOccured);
         console.log(err);
      }
   };

   useEffect(() => {
      if (getJWT) {
         try {
            const fetchedData = async () => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL +
                     `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:asc`,
                  headersObject
               );
               setFavorites(result.data.data);
            };

            fetchedData();
         } catch (err) {
            toast.error(errorOccured);
            console.log(err);
         }
      } else {
         return;
      }
   }, []);

   const state: IFavoritesContext | null = {
      favorites,
      refreshFavorites,
   };

   return <FavoritesContext.Provider value={state}>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider;
