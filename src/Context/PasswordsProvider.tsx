import React, { useState, useContext, useEffect } from "react";
import { Password, ChildrenProps } from "../Interfaces/GlobalInterfaces";
import axios from "axios";

const PasswordsContext = React.createContext<Password[] | null>(null);

export const usePasswordsContext = () => useContext(PasswordsContext);

const PasswordsProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [passwords, setPasswords] = useState<Password[] | null>(() => null);

   useEffect(() => {
      const headersObject = {
         headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
         },
      };

      const userLogged = sessionStorage.getItem("jwt");

      if (userLogged) {
         const fetchedData = async () => {
            const result = await axios.get(
               process.env.REACT_APP_DEV_URL +
                  "/api/passwords?fields=title,username,email,password,siteUrl,faviconAddress",
               headersObject
            );
            setPasswords(result.data.data);
            console.log(result.data.data);
         };

         fetchedData();
      } else {
         return;
      }
   }, []);

   // const state = {
   //    passwords,
   // };

   return <PasswordsContext.Provider value={passwords}>{children}</PasswordsContext.Provider>;
};

export default PasswordsProvider;
