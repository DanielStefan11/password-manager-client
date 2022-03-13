import React, { useState, useContext, useEffect, Children } from "react";
import { ChildrenProps, INote } from "../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured } from "../Utils/notifications";
import { headersObject, getJWT } from "../Utils/authorization";

interface INotesContext {
   notes: INote[] | null;
}

const NotesContext = React.createContext<INotesContext | null>(null);

export const useNotesContext = () => useContext(NotesContext);

const NotesProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   const [notes, setNotes] = useState<INote[] | null>(() => null);
   const [loading, setLoading] = useState<boolean>(() => true);

   const state: INotesContext | null = {
      notes,
   };

   useEffect(() => {
      if (getJWT) {
         try {
            const fetchedData = async (): Promise<void> => {
               const result = await axios.get(
                  process.env.REACT_APP_PASSWORD_MANAGER_URL +
                     `/api/notes?fields=id,title,content,locked&sort=title:asc`,
                  headersObject
               );
               setNotes(result.data.data);
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

   console.log("notes: ", notes);

   return <NotesContext.Provider value={state}>{children}</NotesContext.Provider>;
};

export default NotesProvider;
