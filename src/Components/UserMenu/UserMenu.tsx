import React from "react";
import styles from "./UserMenu.module.scss";
import { useUserInfoContext } from "../../Context/UserInfoProvider";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface Props {
   show: boolean;
   toggle: () => void;
}

const UserMenu: React.FC<Props> = ({ show, toggle }): JSX.Element => {
   // hooks
   const userContext = useUserInfoContext();
   const navigate = useNavigate();
   const darkModeContext = useDarkModeContext();

   // functions
   const logout = () => {
      localStorage.removeItem("jwt");
      navigate(appRoutes.authenticate);
      window.location.reload();
   };

   return (
      <div
         className={`${styles.menu} ${darkModeContext?.darkMode ? styles.menuDarkMode : styles.menuLightMode} ${
            show && styles.menuActive
         }`}
      >
         <span className={styles.userName}>{userContext === null ? "No user data" : userContext.username}</span>

         <span className={styles.userEmail}>{userContext === null ? "No user data" : userContext.email}</span>

         <button className={styles.logoutButton} onClick={logout}>
            Logout
         </button>
      </div>
   );
};

export default UserMenu;
