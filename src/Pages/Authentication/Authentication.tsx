import React, { useState } from "react";
import styles from "./Authentication.module.scss";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import ToggleButton from "../../Components/ToggleButton/ToggleButton";
import { BsFillMoonFill as MoonIcon, BsFillSunFill as SunIcon } from "react-icons/bs";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

// view constants
export const loginView = "login",
   registerView = "register";

const Authentication: React.FC = (): JSX.Element => {
   // states
   const [view, setView] = useState<string>(loginView);

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const viewHandler = (viewId: string) => setView(viewId);

   const renderAuthView = (): JSX.Element => {
      let component: JSX.Element = <LoginBox viewHandler={viewHandler} />;
      if (view === loginView) component = <LoginBox viewHandler={viewHandler} />;
      if (view === registerView) component = <RegisterBox viewHandler={viewHandler} />;

      return component;
   };

   return (
      <div
         className={`${darkModeContext?.darkMode ? styles.backgroundDarkMode : styles.backgroundLightMode} ${styles.loginPage
            }`}
      >
         {/* Dark mode control */}
         <div className={styles.darkModeControl}>
            <SunIcon color="#ffae00" size={20} className={`me-2`} />
            <ToggleButton checkState={darkModeContext?.darkMode} toggle={darkModeContext!.handleToggleDarkMode} />
            <MoonIcon color="#ffd700" size={20} className={`ms-2`} />
         </div>

         {renderAuthView()}
      </div>
   );
};

export default Authentication;
