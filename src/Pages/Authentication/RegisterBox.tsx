import React, { useState, useRef } from "react";
import styles from "./Authentication.module.scss";
import { MdEmail as EmailIcon } from "react-icons/md";
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
import { loginView } from "./Authentication";

interface IProps {
  viewHandler: (viewId: string) => void;
}

const RegisterBox: React.FC<IProps> = ({ viewHandler }): JSX.Element => {
  // state
  const [hidePassword, setHidePassword] = useState<boolean>(() => true);
  const [loading, setLoading] = useState<boolean>(() => false);

  // hooks
  const navigate = useNavigate();
  const darkModeContext = useDarkModeContext();

  // refs
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // functions
  const handleToggleHidePassword = (): void => setHidePassword(!hidePassword);

  const registerHandler = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    // input values
    const usernameInputValue = usernameRef.current!.value;
    const emailInputValue = emailRef.current!.value;
    const passwordInputValue = passwordRef.current!.value;

    // validate values
    const validEmail = emailPattern.test(emailInputValue);
    const validPassword = pswPattern.test(passwordInputValue);

    const reqObj = {
      username: usernameInputValue,
      email: emailInputValue,
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
        let response = await axios.post(process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/auth/local/register", reqObj);
        if (response.status === 200) {
          toast.success("You have successfully created new account!");
          localStorage.setItem("jwt", response.data.jwt);
          navigate(appRoutes.vault);
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(errorOccured, { toastId: "error-register" });
    } finally {
      setLoading(false);
    }

    console.log(reqObj);
  };

  return (
    <div className={`${styles.loginBox} ${darkModeContext?.darkMode ? styles.boxDarkMode : styles.boxLightMode}`}>
      <h2
        className={`size-64 weight-900 ${styles.heading} ${darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode
          }`}
      >
        Sign up
      </h2>

      <form className={styles.formContent} onSubmit={registerHandler}>
        <div className={styles.inputContainer}>
          <UserIcon className={styles.inputIcons} />
          <input
            ref={usernameRef}
            type="text"
            className={`${styles.authInput} highlightInput ${darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
              }`}
            placeholder="Username"
          ></input>
        </div>

        <div className={styles.inputContainer}>
          <EmailIcon className={styles.inputIcons} />
          <input
            ref={emailRef}
            type="email"
            className={`${styles.authInput} highlightInput ${darkModeContext?.darkMode ? styles.inputDarkMode : styles.inputLightMode
              }`}
            placeholder="Email"
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

        <button className={styles.loginButton} onClick={registerHandler}>
          {loading ? <PulseLoader color="#ffffff" size={12} /> : "Register"}
        </button>

        <div className={styles.orContainer}>
          <span className={darkModeContext?.darkMode ? "lightText" : "darkText"}>
            Already have an account?
          </span>
        </div>

        <div className={styles.orContainer}>
          <span
            className={`size-24 weight-700 pointer ${darkModeContext?.darkMode ? styles.headingDarkMode : styles.headingLightMode}`}
            onClick={() => viewHandler(loginView)}
          >
            Login as an existing user
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterBox;