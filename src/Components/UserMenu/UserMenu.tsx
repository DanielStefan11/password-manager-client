import React from "react";
import styles from "./UserMenu.module.scss";
import { useUserInfoContext } from "../../Context/UserInfoProvider";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

interface Props {
   show: boolean;
   toggle: () => void;
}

const UserMenu: React.FC<Props> = ({ show, toggle }): JSX.Element => {
   const userContext = useUserInfoContext();
   const navigate = useNavigate();

   const logout = () => {
      sessionStorage.clear();
      navigate(appRoutes.authenticate);
   };

   return (
      <div className={`${styles.menu} ${show && styles.menuActive}`}>
         <span className={styles.userName}>{userContext === null ? "No user data" : userContext.username}</span>

         <span className={styles.userEmail}>{userContext === null ? "No user data" : userContext.email}</span>

         <button className={styles.logoutButton} onClick={logout}>
            Logout
         </button>
      </div>
   );
};

export default UserMenu;
