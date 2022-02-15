import React, { useState } from "react";
import styles from "./AddPassword.module.scss";
import { Modal } from "react-bootstrap";
import { FaUser as UserIcon, FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { FiLink as LinkIcon } from "react-icons/fi";
import { BsFillInfoSquareFill as TitleIcon } from "react-icons/bs";
import TemplateFavicon from "../../Assets/Global/template-icon.png";
import { toast } from "react-toastify";
import {
   errorFetchFavicon,
   passwordAddedSuccess,
   errorOccured,
   emptyInputsError,
   emailNotValid,
   passwordNotValid,
} from "../../Utils/notifications";
import axios from "axios";
import { emailPattern, pswPattern } from "../../Utils/regexPatterns";
import { usePasswordsContext } from "../../Context/PasswordsProvider";

interface Props {
   show: boolean;
   toggleModal: () => void;
}

interface InputValues {
   title: string;
   url: string;
   username: string;
   email: string;
}

const initialValues: InputValues = {
   title: "",
   url: "",
   username: "",
   email: "",
};

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const length = 10;

const AddPassword: React.FC<Props> = ({ show, toggleModal }): JSX.Element => {
   const [values, setValues] = useState<InputValues>(() => initialValues);
   const [password, setPassword] = useState<string>(() => "");
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);
   const [activeFavicon, setActiveFavicon] = useState<string>(() => "");

   const passwordsContext = usePasswordsContext();

   const validEmail = emailPattern.test(values.email);
   const validPassword = pswPattern.test(password);

   const capitalizeFirstLetter = (word: string): string | undefined => {
      if (word !== "") {
         const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
         return capitalizedWord;
      } else {
         return;
      }
   };

   const handleToggleHidePassword = (): void => setHidePassword(!hidePassword);

   const handleInputChange = (e: React.FormEvent): void => {
      const target = e.target as HTMLInputElement;
      const { name, value } = target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   const handlePasswordChange = (e: React.FormEvent): void => {
      const target = e.target as HTMLInputElement;
      setPassword(target.value);
   };

   const generatePassword = (): void => {
      const formValid = +length > 0;
      if (!formValid) {
         return;
      }
      let character = "";
      let password = "";
      while (password.length < length) {
         const entity1 = Math.ceil(letters.length * Math.random() * Math.random());
         const entity2 = Math.ceil(numbers.length * Math.random() * Math.random());
         const entity3 = Math.ceil(symbols.length * Math.random() * Math.random());
         let hold = letters.charAt(entity1);
         hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
         character += hold;
         character += numbers.charAt(entity2);
         character += symbols.charAt(entity3);
         password = character;
      }
      password = password
         .split("")
         .sort(() => {
            return 0.5 - Math.random();
         })
         .join("");
      setPassword(password.substring(0, length));
   };

   const handleFetchFavicon = () => {
      if (values.url !== "") {
         setActiveFavicon(values.url + "favicon.ico");
      } else {
         toast.error(errorFetchFavicon);
      }
   };

   const handleUndoFavicon = () => setActiveFavicon("");

   const resetValues = () => {
      setValues({ title: "", url: "", username: "", email: "" });
      setPassword("");
      setActiveFavicon("");
   };

   const addPassword = async (): Promise<void> => {
      const headersObject = {
         headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
         },
      };

      const requestBody = {
         data: {
            title: values.title,
            siteUrl: values.url,
            username: values.username,
            email: values.email,
            password,
            faviconAddress: activeFavicon,
         },
      };

      try {
         if (
            values.title === "" ||
            values.url === "" ||
            values.username === "" ||
            values.email === "" ||
            password === ""
         ) {
            toast.error(emptyInputsError);
         } else if (!validEmail) {
            toast.error(emailNotValid);
         } else if (!validPassword) {
            toast.error(passwordNotValid);
         } else {
            await axios.post(process.env.REACT_APP_DEV_URL + "/api/passwords", requestBody, headersObject);
            toast.success(passwordAddedSuccess);
            toggleModal();
            resetValues();
            passwordsContext?.fetchPwdAscending();
         }
      } catch (err) {
         toast.error(errorOccured);
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body>
            <h2 className={`text-center weight-400 size-30 dark-blue-text`}>Add Password</h2>

            <div className={styles.inputsContainer}>
               <div className={styles.inputsWrapper}>
                  <TitleIcon className={styles.inputIcons} />
                  <input
                     value={capitalizeFirstLetter(values.title)}
                     name="title"
                     type="text"
                     className={styles.addPswInputs}
                     placeholder="Insert A title"
                     onChange={handleInputChange}
                  />
               </div>

               <div className={styles.inputsWrapper}>
                  <LinkIcon className={styles.inputIcons} />
                  <input
                     value={values.url}
                     name="url"
                     type="text"
                     className={styles.addPswInputs}
                     placeholder="Insert site URL"
                     onChange={handleInputChange}
                  />
               </div>

               <div className={styles.inputsWrapper}>
                  <UserIcon className={styles.inputIcons} />
                  <input
                     value={values.username}
                     type="text"
                     name="username"
                     className={styles.addPswInputs}
                     placeholder="Insert your username"
                     onChange={handleInputChange}
                  />
               </div>

               <div className={styles.inputsWrapper}>
                  <EmailIcon className={styles.inputIcons} />
                  <input
                     value={values.email}
                     name="email"
                     type="email"
                     className={styles.addPswInputs}
                     placeholder="Insert your email"
                     onChange={handleInputChange}
                  />
               </div>

               <div className={styles.inputsWrapper}>
                  {hidePassword ? (
                     <CloseLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  ) : (
                     <OpenedLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  )}
                  <input
                     value={password}
                     name="password"
                     type={hidePassword ? "password" : "text"}
                     className={styles.addPswInputs}
                     placeholder="Insert a password"
                     onChange={e => handlePasswordChange(e)}
                  />
               </div>

               <div className={styles.spanContainer}>
                  <p className={`size-16 weight-400 `}>
                     Or{" "}
                     <span className={`size-16 weight-700 dark-blue-text pointer`} onClick={generatePassword}>
                        generate random password
                     </span>
                  </p>
               </div>

               <h5 className={`size-18 weight-400`}>Generate favicon (optional):</h5>

               <div className={styles.faviconContainer}>
                  <div className={styles.favicon}>
                     <img
                        src={activeFavicon === "" ? TemplateFavicon : activeFavicon}
                        alt="webiste icon"
                        className={styles.icon}
                     />
                  </div>
                  <div className={styles.actionContainer}>
                     <button className={styles.fetchButton} onClick={handleFetchFavicon}>
                        Fetch Icon
                     </button>
                     <span className="size-18 weight-700 dark-blue-text pointer" onClick={handleUndoFavicon}>
                        Undo
                     </span>
                  </div>
               </div>
            </div>
         </Modal.Body>

         <Modal.Footer>
            <div className={styles.btnContainer}>
               <button className={styles.addButton} onClick={addPassword}>
                  Add
               </button>

               <span className="cancel-span" onClick={toggleModal}>
                  Cancel
               </span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default AddPassword;
