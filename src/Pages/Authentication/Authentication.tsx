import React, { useState, useRef } from "react";
import styles from "./Authentication.module.scss";
import { FaLock as CloseLock, FaUnlockAlt as OpenedLock, FaUserAlt as UserIcon } from "react-icons/fa";
import axios from "axios";
import { emailPattern, pswPattern } from "../../Utils/regexPatterns";
import { toast } from "react-toastify";
import {
   loginSuccess,
   errorOccured,
   emailNotValid,
   passwordNotValid,
   emptyInputsError,
} from "../../Utils/notifications";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const Authentication: React.FC = (): JSX.Element => {
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);

   const navigate = useNavigate();

   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   const handleToggleHidePassword = (): void => setHidePassword(!hidePassword);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // input values
      const emailInputValue = emailRef.current!.value;
      const passwordInputValue = passwordRef.current!.value;

      // validate values
      const validEmail = emailPattern.test(emailInputValue);
      const validPassword = pswPattern.test(passwordInputValue);

      const reqObj = {
         identifier: emailInputValue,
         password: passwordInputValue,
      };

      try {
         if (emailInputValue === "" || passwordInputValue === "") {
            toast.error(emptyInputsError);
         } else if (!validEmail) {
            toast.error(emailNotValid);
         } else if (!validPassword) {
            toast.error(passwordNotValid);
         } else {
            let response = await axios.post(process.env.REACT_APP_DEV_URL + "/api/auth/local", reqObj);
            if (response.status === 200) {
               sessionStorage.setItem("jwt", response.data.jwt);

               navigate(appRoutes.vault);

               toast.success(loginSuccess);
            }
         }
      } catch (error) {
         toast.error(errorOccured);
         console.log(error);
      }
   };

   return (
      <div className={styles.loginPage}>
         <div className={styles.loginBox}>
            <h2 className={`size-64 weight-900 ${styles.heading}`}>Login</h2>

            <form className={styles.formContent} onSubmit={handleLogin}>
               <div className={styles.inputContainer}>
                  <UserIcon className={styles.inputIcons} />
                  <input
                     ref={emailRef}
                     type="email"
                     className={styles.authInput}
                     placeholder="Email or username"
                  ></input>
               </div>

               <div className={styles.inputContainer}>
                  {hidePassword ? (
                     <CloseLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  ) : (
                     <OpenedLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  )}
                  <input
                     ref={passwordRef}
                     type={hidePassword ? "password" : "text"}
                     className={styles.authInput}
                     placeholder="Password"
                  ></input>
               </div>

               <button className={styles.loginButton} onClick={handleLogin}>
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};

export default Authentication;
