import React, { useState } from "react";
import styles from "./Authentication.module.scss";
import { FaLock as CloseLock, FaUnlockAlt as OpenedLock, FaUserAlt as UserIcon } from "react-icons/fa";

const Authentication: React.FC = (): JSX.Element => {
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);

   const handleToggleHidePassword = (): void => setHidePassword(!hidePassword);

   return (
      <div className={styles.loginPage}>
         <div className={styles.loginBox}>
            <h2 className={`size-64 weight-900 ${styles.heading}`}>Login</h2>

            <form className={styles.formContent}>
               <div className={styles.inputContainer}>
                  <UserIcon className={styles.inputIcons} />
                  <input type="email" className={styles.authInput} placeholder="Email or username"></input>
               </div>

               <div className={styles.inputContainer}>
                  {hidePassword ? (
                     <CloseLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  ) : (
                     <OpenedLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  )}
                  <input
                     type={hidePassword ? "password" : "text"}
                     className={styles.authInput}
                     placeholder="Password"
                  ></input>
               </div>

               <button className={styles.loginButton}>Login</button>
            </form>
         </div>
      </div>
   );
};

export default Authentication;
