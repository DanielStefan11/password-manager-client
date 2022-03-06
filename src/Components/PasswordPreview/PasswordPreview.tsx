import React, { useState } from "react";
import styles from "./PasswordPreview.module.scss";
import { Modal } from "react-bootstrap";
import { Password } from "../../Interfaces/GlobalInterfaces";
import { AiFillEye as RevealPwdIcon, AiFillEyeInvisible as HidePwdIcon } from "react-icons/ai";
import { MdFileCopy as CopyIcon } from "react-icons/md";
import TemplateFavicon from "../../Assets/Global/template-icon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface Props {
   show: boolean;
   toggleModal: () => void;
   passwordItem?: Password;
}

const PasswordPreview: React.FC<Props> = ({ show, toggleModal, passwordItem }): JSX.Element => {
   // state
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const handleHidePassword = (): void => setHidePassword(!hidePassword);

   const handleCopy = (itemType: string, valueCopied: string) => {
      if (valueCopied === "n/a" || valueCopied === "N/A" || valueCopied === "") {
         toast.error("There is no value to copy", { toastId: "no-value-to copy" });
      } else {
         toast.success(`The ${itemType} has been copied to the clipboard`, { toastId: "already-copied" });
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Header closeButton className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <div className="w-100 pt-4 d-flex justify-content-center align-items-center">
               <div className={`shadow ${styles.faviconContainer}`}>
                  <img
                     src={
                        passwordItem?.attributes.faviconAddress
                           ? passwordItem?.attributes.faviconAddress
                           : TemplateFavicon
                     }
                     alt="site icon"
                     className={styles.favicon}
                  />
               </div>
               <h3 className="mb-0 text-center size-26 weight-700 primary-blue-text">
                  {passwordItem?.attributes.title ? passwordItem?.attributes.title : "Unkown"}
               </h3>
            </div>
         </Modal.Header>

         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <div className="w-100 d-flex flex-column">
               {/* Username */}
               <div
                  className={`shadow ${styles.item} ${
                     darkModeContext?.darkMode ? styles.itemDarkMode : styles.itemLightMode
                  }`}
               >
                  <p className="mb-1 weight-700 size-18">Username</p>
                  <span className="weight-400 size-16 text-break">
                     {passwordItem?.attributes.username ? passwordItem?.attributes.username : "N/A"}
                  </span>

                  <CopyToClipboard
                     text={
                        passwordItem?.attributes.username === undefined || passwordItem?.attributes.username === ""
                           ? "N/A"
                           : passwordItem?.attributes.username
                     }
                     onCopy={() =>
                        handleCopy(
                           "username",
                           passwordItem?.attributes.username === undefined || passwordItem?.attributes.username === ""
                              ? "n/a"
                              : passwordItem?.attributes.username
                        )
                     }
                  >
                     <CopyIcon className={styles.copyIcon} />
                  </CopyToClipboard>
               </div>

               {/* Email */}
               <div
                  className={`shadow ${styles.item} ${
                     darkModeContext?.darkMode ? styles.itemDarkMode : styles.itemLightMode
                  }`}
               >
                  <p className="mb-1 weight-700 size-18">Email</p>
                  <span className="weight-400 size-16 text-break">
                     {passwordItem?.attributes.email ? passwordItem?.attributes.email : "N/A"}
                  </span>

                  <CopyToClipboard
                     text={
                        passwordItem?.attributes.email === undefined || passwordItem?.attributes.email === ""
                           ? "N/A"
                           : passwordItem?.attributes.email
                     }
                     onCopy={() =>
                        handleCopy(
                           "email",
                           passwordItem?.attributes.email === undefined || passwordItem?.attributes.email === ""
                              ? "N/A"
                              : passwordItem?.attributes.email
                        )
                     }
                  >
                     <CopyIcon className={styles.copyIcon} />
                  </CopyToClipboard>
               </div>

               {/* Password */}
               <div
                  className={`shadow ${styles.item} ${
                     darkModeContext?.darkMode ? styles.itemDarkMode : styles.itemLightMode
                  }`}
               >
                  <div className="mb-1 d-flex align-items-center">
                     <p className="mb-0 weight-700 size-18">Password</p>
                     {hidePassword ? (
                        <RevealPwdIcon
                           className="ms-3 pointer"
                           size={25}
                           color="#3c8dbb"
                           onClick={handleHidePassword}
                        />
                     ) : (
                        <HidePwdIcon className="ms-3 pointer" size={25} color="#3c8dbb" onClick={handleHidePassword} />
                     )}
                  </div>

                  {hidePassword ? (
                     <span className="size-30 weight-900 primary-blue-text">. . . . . . . . . . </span>
                  ) : (
                     <span className={`weight-400 size-16 text-break`}>
                        {passwordItem?.attributes.password ? passwordItem?.attributes.password : "N/A"}
                     </span>
                  )}

                  <CopyToClipboard
                     text={
                        passwordItem?.attributes.password === undefined || passwordItem?.attributes.password === ""
                           ? "N/A"
                           : passwordItem?.attributes.password
                     }
                     onCopy={() =>
                        handleCopy(
                           "password",
                           passwordItem?.attributes.password === undefined || passwordItem?.attributes.password === ""
                              ? "N/A"
                              : passwordItem?.attributes.password
                        )
                     }
                  >
                     <CopyIcon className={styles.copyIcon} />
                  </CopyToClipboard>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
};

export default PasswordPreview;
