import React from "react";
import styles from "./UserCard.module.scss";
import { useDarkModeContext } from "../../../Context/DarkModeProvider";
import { useUserInfoContext } from "../../../Context/UserInfoProvider";

const UserCard: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();
   const userContext = useUserInfoContext();

   return (
      <div
         className={`shadow darkModeTransition settingsCard ${
            darkModeContext?.darkMode ? "elementBgDarkMode" : "settingsCardLightMode"
         }`}
      >
         <div className={styles.imageContainer}></div>
         <h4 className="text-center mt-3 size-26 weight-700 primary-blue-text">{userContext?.username}</h4>
      </div>
   );
};

export default UserCard;
