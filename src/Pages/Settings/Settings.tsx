import React from "react";
import styles from "./Settings.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import ToggleButton from "../../Components/ToggleButton/ToggleButton";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

const Settings: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();

   return (
      <div className={`page darkModeTransition ${darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"}`}>
         <PageHeading />

         <div className={`mt-5 d-flex flex-wrap ${styles.settingsContainer}`}>
            <div
               className={`shadow darkModeTransition ${styles.box} ${
                  darkModeContext?.darkMode ? "elementBgDarkMode" : styles.boxLightMode
               }`}
            >
               <h4 className="text-center mb-4 size-26 weight-700">Enable dark mode</h4>

               <div className="w-100 d-flex justify-content-center">
                  <ToggleButton checkState={darkModeContext?.darkMode} toggle={darkModeContext!.handleToggleDarkMode} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
