import React, { useState, useContext, useEffect } from "react";
import { Password, ChildrenProps, IPagination } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured } from "../Utils/notifications";
import { headersObject, getJWT } from "../Utils/authorization";

interface ContextState {
   passwords: Password[] | null;
   sortPwdAscending: () => Promise<void>;
   sortPwdDescending: () => Promise<void>;
   refreshData: () => Promise<void>;
   paginationData: IPagination | null;
   pageNumber: number;
   handlePagination: (buttonID: string) => void;
}

const PasswordsContext = React.createContext<ContextState | null>(null);

export const usePasswordsContext = () => useContext(PasswordsContext);

const PasswordsProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [passwords, setPasswords] = useState<Password[] | null>(() => null);
   const [paginationData, setPaginationData] = useState<IPagination | null>(() => null);
   const [pageNumber, setPageNumber] = useState<number>(() => 1);

   // fetching data ascending
   const sortPwdAscending = async (): Promise<void> => {
      try {
         const result = await axios.get(
            process.env.REACT_APP_PASSWORD_MANAGER_URL +
               `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:asc`,
            headersObject
         );
         setPasswords(result.data.data);
      } catch (err) {
         toast.error(errorOccured);
         console.log(err);
      }
   };

   // sort data descending
   const sortPwdDescending = async () => {
      try {
         const result = await axios.get(
            process.env.REACT_APP_PASSWORD_MANAGER_URL +
               `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&sort=title:desc`,
            headersObject
         );
         setPasswords(result.data.data);
      } catch (err) {
         toast.error(errorOccured);
         console.log(err);
      }
   };

   // refresh data
   const refreshData = async (): Promise<void> => {
      try {
         const result = await axios.get(
            process.env.REACT_APP_PASSWORD_MANAGER_URL +
               `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=title:asc`,
            headersObject
         );
         setPasswords(result.data.data);
      } catch (err) {
         toast.error(errorOccured);
         console.log(err);
      }
   };

   // handle pagination
   const handlePagination = (buttonID: string) => {
      if (buttonID === "prev") {
         if (pageNumber === 1) {
            return;
         } else {
            setPageNumber(prevPageState => prevPageState - 1);
         }
      }
      if (buttonID === "next") {
         setPageNumber(prevPageState => prevPageState + 1);
      }
   };

   // initial data fetching
   useEffect(() => {
      if (getJWT) {
         try {
            const fetchedData = async () => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL +
                     `/api/passwords?fields=id,title,username,email,password,siteUrl,faviconAddress,favorite&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=title:asc`,
                  headersObject
               );
               setPasswords(result.data.data);
               setPaginationData(result.data.meta.pagination);
            };

            fetchedData();
         } catch (err) {
            toast.error(errorOccured);
            console.log(err);
         }
      } else {
         return;
      }
   }, [pageNumber]);

   const state: ContextState | null = {
      passwords,
      sortPwdAscending,
      sortPwdDescending,
      refreshData,
      paginationData,
      pageNumber,
      handlePagination,
   };

   return <PasswordsContext.Provider value={state}>{children}</PasswordsContext.Provider>;
};

export default PasswordsProvider;
