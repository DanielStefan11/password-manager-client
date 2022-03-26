import React, { useState, useContext, useEffect } from "react";
import { Password, ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured } from "../Utils/notifications";
import { headersObject, getJWT } from "../Utils/authorization";

interface IFavoritesContext {
   favorites: Password[] | null;
   refreshFavorites: () => Promise<void>;
   loading: boolean;
}

const FavoritesContext = React.createContext<IFavoritesContext | null>(null);

export const useFavoritesContext = () => useContext(FavoritesContext);

const FavoritesProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [favorites, setFavorites] = useState<Password[] | null>(() => null);
   const [loading, setLoading] = useState<boolean>(() => true);

   const refreshFavorites = async (): Promise<void> => {
      try {
         setLoading(true);
         const result = await axios.get(
            process.env.REACT_APP_PASSWORD_MANAGER_URL +
               `/api/favorites?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:asc`,
            headersObject
         );
         setFavorites(result.data.data);
      } catch (err) {
         toast.error(errorOccured, { toastId: "erroroccured" });
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (getJWT) {
         try {
            const fetchedData = async (): Promise<void> => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL +
                     `/api/favorites?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:asc`,
                  headersObject
               );
               setFavorites(result.data.data);
            };

            fetchedData();
         } catch (err) {
            toast.error(errorOccured, { toastId: "errocurred" });
         } finally {
            setLoading(false);
         }
      } else {
         return;
      }
   }, []);

   const state: IFavoritesContext | null = {
      favorites,
      refreshFavorites,
      loading,
   };

   return <FavoritesContext.Provider value={state}>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider;
