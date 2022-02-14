import React, { useState, useContext, useEffect } from "react";
import { Password, ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured } from "../Utils/notifications";

interface ContextState {
   passwords: Password[] | null;
   refreshPasswordsList: () => Promise<void>;
}

const PasswordsContext = React.createContext<ContextState | null>(null);

export const usePasswordsContext = () => useContext(PasswordsContext);

const PasswordsProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [passwords, setPasswords] = useState<Password[] | null>(() => null);

   const headersObject = {
      headers: {
         Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
   };

   const userLogged = sessionStorage.getItem("jwt");

   const refreshPasswordsList = async (): Promise<void> => {
      if (userLogged) {
         try {
            const result = await axios.get(
               process.env.REACT_APP_DEV_URL +
                  "/api/passwords?fields=title,username,email,password,siteUrl,faviconAddress",
               headersObject
            );
            setPasswords(result.data.data);
         } catch (err) {
            toast.error(errorOccured);
            console.log(err);
         }
      } else {
         return;
      }
   };

   useEffect(() => {
      if (userLogged) {
         try {
            const fetchedData = async () => {
               const result = await axios.get(
                  process.env.REACT_APP_DEV_URL +
                     "/api/passwords?fields=title,username,email,password,siteUrl,faviconAddress",
                  headersObject
               );
               setPasswords(result.data.data);
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

   const state: ContextState | null = {
      passwords,
      refreshPasswordsList,
   };

   return <PasswordsContext.Provider value={state}>{children}</PasswordsContext.Provider>;
};

export default PasswordsProvider;
