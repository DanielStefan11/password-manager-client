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
import PulseLoader from "react-spinners/PulseLoader";
import { getJWT } from "../../Utils/authorization";
import EmojiIcon from "../../Assets/Login/emoji-smile.png";
import { registerView } from "./Authentication";

interface IProps {
  viewHandler: (viewId: string) => void;
}

const LoginBox: React.FC<IProps> = ({ viewHandler }): JSX.Element => {
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

  const handleLogin = async (e: React.FormEvent): Promise<any> => {
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
      setLoading(true);
      if (emailInputValue === "" || passwordInputValue === "") {
        toast.error(emptyInputsError, { toastId: "zzxrxtzfeaml" });
      } else if (!validEmail) {
        toast.error(emailNotValid, { toastId: "zzxrxtzfeamljdh" });
      } else if (!validPassword) {
        toast.error(passwordNotValid, { toastId: "zzxrxtzfeamlwddw" });
      } else {
        let response = await axios.post(process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/auth/local", reqObj);
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data.jwt);
          navigate(appRoutes.vault);
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(errorOccured, { toastId: "sdzzxrxtzfeamls" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginBox} ${darkModeContext?.darkMode ? styles.boxDarkMode : styles.boxLightMode}`}>
      {!getJWT ? (
        <>
          <h2
            className={`size-64 weight-900 ${styles.heading} ${darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode
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
                className={`${styles.authInput} highlightInput ${darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
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
                className={`${styles.authInput} highlightInput ${darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
                  }`}
                placeholder="Password"
              ></input>
            </div>

            <button className={styles.loginButton} onClick={handleLogin}>
              {loading ? <PulseLoader color="#ffffff" size={12} /> : "Log In"}
            </button>

            <div className={styles.orContainer}>
              <span className={darkModeContext?.darkMode ? "lightText" : "darkText"}>Or</span>
            </div>

            <div className={styles.orContainer}>
              <span
                className={`size-24 weight-700 pointer ${darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode}`}
                onClick={() => viewHandler(registerView)}
              >
                Register as new user
              </span>
            </div>
          </form>
        </>
      ) : (
        <>
          <img src={EmojiIcon} alt="smile emoji" className={styles.emoji} />

          <h2
            className={`size-64 weight-900 text-center ${styles.heading} ${darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode
              }`}
          >
            Welcome back!
          </h2>

          <button className={styles.goToVaultButton} onClick={() => navigate(appRoutes.vault)}>
            Go to Vault
          </button>
        </>
      )}
    </div>
  );
};

export default LoginBox;