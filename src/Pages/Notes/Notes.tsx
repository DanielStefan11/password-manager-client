import React from "react";
import styles from "./Notes.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import FadeLoader from "react-spinners/FadeLoader";

const Notes = () => {
   // hooks
   const darkModeContext = useDarkModeContext();

   return (
      <div className={`page darkModeTransition ${darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"}`}>
         <PageHeading />
      </div>
   );
};

export default Notes;
