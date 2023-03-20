import React from "react";
import styles from "./UserCard.module.scss";
import { useDarkModeContext } from "../../../Context/DarkModeProvider";
import { useUserInfoContext } from "../../../Context/UserInfoProvider";
import UserIcon from "../../../Assets/Settings/user.png";

const UserCard: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();
   const userContext = useUserInfoContext();

   return (
      <div
         className={`shadow darkModeTransition settingsCard ${darkModeContext?.darkMode ? "elementBgDarkMode" : "settingsCardLightMode"
            }`}
      >
         <img src={UserIcon} alt="user" className={styles.userIcon} />
         <div className={styles.infoContainer}>
            <h6 className="size-14 weight-700 primary-blue-text">Username: <span className="ms-1 weight-400">{userContext?.username}</span></h6>
            <h6 className="size-14 weight-700 primary-blue-text">Email: <span className="ms-1 weight-400">{userContext?.email}</span></h6>
         </div>
      </div>
   );
};

export default UserCard;
