import React from "react";
import styles from "./DarkMode.module.scss";
import ToggleButton from "../../../Components/ToggleButton/ToggleButton";
import { useDarkModeContext } from "../../../Context/DarkModeProvider";
import { BsFillMoonFill as MoonIcon, BsFillSunFill as SunIcon } from "react-icons/bs";

const DarkMode: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();

   return (
      <div
         className={`shadow darkModeTransition ${styles.box} ${
            darkModeContext?.darkMode ? "elementBgDarkMode" : styles.boxLightMode
         }`}
      >
         <h4 className="text-center mb-4 size-20 weight-700">System Theme</h4>

         <div className={styles.darkModeControl}>
            <SunIcon color="#ffae00" size={20} className={`me-2`} />
            <ToggleButton checkState={darkModeContext?.darkMode} toggle={darkModeContext!.handleToggleDarkMode} />
            <MoonIcon color="#ffd700" size={20} className={`ms-2`} />
         </div>
      </div>
   );
};

export default DarkMode;
