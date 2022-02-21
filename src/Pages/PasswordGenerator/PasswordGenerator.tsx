import React, { useState } from "react";
import styles from "./PasswordGenerator.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { AiFillEye as RevealPwdIcon, AiFillEyeInvisible as HidePwdIcon } from "react-icons/ai";
import { MdFileCopy as CopyIcon } from "react-icons/md";
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from "../../Utils/passwordCharacters";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface PasswordSettings {
   uppercase: boolean;
   lowercase: boolean;
   numbers: boolean;
   symbols: boolean;
}

const initialPasswordSettings: PasswordSettings = {
   uppercase: false,
   lowercase: false,
   numbers: false,
   symbols: false,
};

const PasswordGenerator: React.FC = (): JSX.Element => {
   // state
   const [password, setPassword] = useState<string>(() => "");
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);
   const [passwordLength, setPasswordLength] = useState<number>(() => 12);
   const [checkAll, setCheckAll] = useState<boolean>(() => false);
   const [passwordSettings, setPasswordSettings] = useState<PasswordSettings>(() => initialPasswordSettings);

   // hooks
   const darkModeContext = useDarkModeContext();

   // notifications
   const noPwdSettings: JSX.Element = <span id="no-pwd-settings">You must select at least one password pattern</span>;
   const pwdCopied: JSX.Element = <span id="pwd-copied">Password successfully copied</span>;
   const noPwdToCopy: JSX.Element = <span id="no-pwd-copied">You must first generate the password</span>;

   // functions
   const handleCopy = () => {
      if (password === "") {
         toast.error(noPwdToCopy);
      } else {
         toast.success(pwdCopied);
      }
   };

   const handleHidePassword = (): void => setHidePassword(!hidePassword);

   const handleLength = (e: React.FormEvent<HTMLInputElement>): void => {
      setPasswordLength(Number(e.currentTarget.value));
   };

   const handlePasswordSettings = (e: React.FormEvent<HTMLInputElement>): void => {
      const target = e.currentTarget;
      const { name, checked } = target;
      setPasswordSettings({ ...passwordSettings, [name]: checked });
   };

   const handleCheckAll = (e: React.FormEvent<HTMLInputElement>): void => {
      const checkedValue = e.currentTarget.checked;
      setCheckAll(checkedValue);
      setPasswordSettings({
         uppercase: checkedValue,
         lowercase: checkedValue,
         numbers: checkedValue,
         symbols: checkedValue,
      });
   };

   const handleGeneratePassword = (): void => {
      let charactersList: string = "";

      if (
         !passwordSettings.uppercase &&
         !passwordSettings.lowercase &&
         !passwordSettings.numbers &&
         !passwordSettings.symbols
      ) {
         toast.error(noPwdSettings);
      } else {
         if (passwordSettings.uppercase) {
            charactersList = charactersList + upperCaseLetters;
         }
         if (passwordSettings.lowercase) {
            charactersList = charactersList + lowerCaseLetters;
         }
         if (passwordSettings.numbers) {
            charactersList = charactersList + numbers;
         }
         if (passwordSettings.symbols) {
            charactersList = charactersList + specialCharacters;
         }
         setPassword(createPassword(charactersList));
      }
   };

   const createPassword = (charactersList: string): string => {
      let passwordToCreate: string = "";
      const characterListLength = charactersList.length;

      for (let i = 0; i < passwordLength; i++) {
         const characterIndex = Math.round(Math.random() * characterListLength);
         passwordToCreate = passwordToCreate + charactersList.charAt(characterIndex);
      }
      return passwordToCreate;
   };

   return (
      <div
         className={`page darkModeTransition ${styles.generatorPage} ${
            darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"
         }`}
      >
         <PageHeading />

         <div className="w-100 d-flex justify-content-center align-items-center">
            <div
               className={`shadow darkModeTransition ${styles.generator} ${
                  darkModeContext?.darkMode ? "elementBgDarkMode" : styles.generatorLightMode
               }`}
            >
               {/* Password generated */}
               <input
                  value={password}
                  type={hidePassword ? "password" : "text"}
                  disabled
                  className={`shadow darkModeTransition ${styles.passwordInput} ${
                     darkModeContext?.darkMode ? "inputDarkMode" : styles.inputLightMode
                  }`}
                  placeholder="Password will be generated here"
               />

               {/* Controls */}
               <div className="mt-3 w-100 d-flex">
                  <button
                     className={`me-1 d-flex align-items-center justify-content-center ${styles.inputButtons}`}
                     onClick={handleHidePassword}
                  >
                     {hidePassword ? (
                        <>
                           <RevealPwdIcon className="me-2" />
                           <span>View</span>
                        </>
                     ) : (
                        <>
                           <HidePwdIcon className="me-2" />
                           <span>Hide</span>
                        </>
                     )}
                  </button>

                  <CopyToClipboard text={password} onCopy={handleCopy}>
                     <button className={`d-flex align-items-center justify-content-center ${styles.inputButtons}`}>
                        <CopyIcon className="me-2" />
                        <span>Copy</span>
                     </button>
                  </CopyToClipboard>
               </div>

               <div className="mt-4 w-100 d-flex flex-column">
                  {/* Password length */}
                  <label className="mb-4 w-100 d-flex flex-column">
                     <div className="w-100 d-flex justify-content-between">
                        <span>8</span>
                        <span className="text-center mb-2 weight-700 size-18">Length: {passwordLength}</span>
                        <span>20</span>
                     </div>

                     <input
                        value={passwordLength}
                        type="range"
                        step={1}
                        min={8}
                        max={20}
                        className={`w-100 pointer`}
                        onChange={e => handleLength(e)}
                     />
                  </label>

                  {/* Check all */}
                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <span className={`weight-700`}>Check All</span>
                     <input checked={checkAll} type="checkbox" onChange={e => handleCheckAll(e)} />
                     <span className="checkmark"></span>
                  </label>

                  {/* Uppercase letters */}
                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include </span>Uppercase Letters
                     </p>
                     <input
                        name="uppercase"
                        checked={passwordSettings.uppercase}
                        type="checkbox"
                        onChange={e => handlePasswordSettings(e)}
                     />
                     <span className="checkmark"></span>
                  </label>

                  {/* Lowercase letters */}
                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include </span>Lowercase Letters
                     </p>
                     <input
                        name="lowercase"
                        checked={passwordSettings.lowercase}
                        type="checkbox"
                        onChange={e => handlePasswordSettings(e)}
                     />
                     <span className="checkmark"></span>
                  </label>

                  {/* Numbers */}
                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include</span> Numbers
                     </p>
                     <input
                        name="numbers"
                        checked={passwordSettings.numbers}
                        type="checkbox"
                        onChange={e => handlePasswordSettings(e)}
                     />
                     <span className="checkmark"></span>
                  </label>

                  {/* Symbols */}
                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include</span> Symbols
                     </p>
                     <input
                        name="symbols"
                        checked={passwordSettings.symbols}
                        type="checkbox"
                        onChange={e => handlePasswordSettings(e)}
                     />
                     <span className="checkmark"></span>
                  </label>

                  <button
                     className={darkModeContext?.darkMode ? styles.generateButtonDM : styles.generateButton}
                     onClick={handleGeneratePassword}
                  >
                     Generate
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PasswordGenerator;
