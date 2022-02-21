import React, { useState, useContext, useEffect } from "react";
import { ChildrenProps } from "../Interfaces/GlobalInterfaces";

interface IDarkMode {
   darkModeSetting: string | null;
   darkMode: boolean;
   enableDarkMode: () => void;
   disableDarkMode: () => void;
   handleToggleDarkMode: () => void;
}

const DarkModeContext = React.createContext<IDarkMode | null>(null);

export const useDarkModeContext = () => useContext(DarkModeContext);

const darkModeKey: string = "darkMode";
const darkModeValue: string = "true";
const darkModeSetting: string | null = localStorage.getItem(darkModeKey);

const DarkModeProvider: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
   // state
   const [darkMode, setDarkMode] = useState<boolean>(() => (darkModeSetting ? true : false));

   // functions
   const handleToggleDarkMode = (): void => setDarkMode(!darkMode);

   const enableDarkMode = (): void => localStorage.setItem(darkModeKey, darkModeValue);

   const disableDarkMode = (): void => localStorage.removeItem(darkModeKey);

   useEffect(() => {
      if (darkMode) {
         enableDarkMode();
      } else {
         disableDarkMode();
      }
   }, [darkMode]);

   // data
   const state = {
      darkModeSetting,
      darkMode,
      enableDarkMode,
      disableDarkMode,
      handleToggleDarkMode,
   };

   return <DarkModeContext.Provider value={state}>{children}</DarkModeContext.Provider>;
};

export default DarkModeProvider;
