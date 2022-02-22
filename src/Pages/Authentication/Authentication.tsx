import React, { useState, useRef } from "react";
import styles from "./Authentication.module.scss";
import { FaLock as CloseLock, FaUnlockAlt as OpenedLock, FaUserAlt as UserIcon } from "react-icons/fa";
import axios from "axios";
import { emailPattern, pswPattern } from "../../Utils/regexPatterns";
import { toast } from "react-toastify";
import { errorOccured, emailNotValid, passwordNotValid, emptyInputsError } from "../../Utils/notifications";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import ToggleButton from "../../Components/ToggleButton/ToggleButton";
import { BsFillMoonFill as MoonIcon, BsFillSunFill as SunIcon } from "react-icons/bs";
import PulseLoader from "react-spinners/PulseLoader";

const Authentication: React.FC = (): JSX.Element => {
   // state
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);
   const [loading, setLoading] = useState<boolean>(() => false);

   // hooks
   const navigate = useNavigate();
   const darkModeContext = useDarkModeContext();

   // refs
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   // functions
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

      setLoading(true);

      try {
         if (emailInputValue === "" || passwordInputValue === "") {
            toast.error(emptyInputsError);
            setLoading(false);
         } else if (!validEmail) {
            toast.error(emailNotValid);
            setLoading(false);
         } else if (!validPassword) {
            toast.error(passwordNotValid);
            setLoading(false);
         } else {
            let response = await axios.post(process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/auth/local", reqObj);
            if (response.status === 200) {
               sessionStorage.setItem("jwt", response.data.jwt);
               setLoading(false);
               navigate(appRoutes.vault);
               window.location.reload();
            }
         }
      } catch (error) {
         toast.error(errorOccured);
         setLoading(false);
         console.log(error);
      }
   };

   return (
      <div
         className={`${darkModeContext?.darkMode ? styles.backgroundDarkMode : styles.backgroundLightMode} ${
            styles.loginPage
         }`}
      >
         {/* Dark mode control */}
         <div className={styles.darkModeControl}>
            <SunIcon color="#ffae00" size={20} className={`me-2`} />
            <ToggleButton checkState={darkModeContext?.darkMode} toggle={darkModeContext!.handleToggleDarkMode} />
            <MoonIcon color="#ffd700" size={20} className={`ms-2`} />
         </div>

         {/* Login box */}
         <div className={`${styles.loginBox} ${darkModeContext?.darkMode ? styles.boxDarkMode : styles.boxLightMode}`}>
            <h2
               className={`size-64 weight-900 ${styles.heading} ${
                  darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode
               }`}
            >
               Login
            </h2>

            <form className={styles.formContent} onSubmit={handleLogin}>
               <div className={styles.inputContainer}>
                  <UserIcon className={styles.inputIcons} />
                  <input
                     ref={emailRef}
                     type="email"
                     className={`${styles.authInput} ${
                        darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
                     }`}
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
                     className={`${styles.authInput} ${
                        darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
                     }`}
                     placeholder="Password"
                  ></input>
               </div>

               <button className={styles.loginButton} onClick={handleLogin}>
                  {loading ? <PulseLoader color="#ffffff" size={12} /> : "Log In"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default Authentication;
