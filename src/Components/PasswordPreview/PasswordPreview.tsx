import React, { useState } from "react";
import styles from "./PasswordPreview.module.scss";
import { Modal } from "react-bootstrap";
import { Password } from "../../Interfaces/GlobalInterfaces";
import { AiFillEye as RevealPwdIcon, AiFillEyeInvisible as HidePwdIcon } from "react-icons/ai";
import { MdFileCopy as CopyIcon } from "react-icons/md";
import TemplateFavicon from "../../Assets/Global/template-icon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

interface Props {
   show: boolean;
   toggleModal: () => void;
   passwordItem?: Password;
}

const PasswordPreview: React.FC<Props> = ({ show, toggleModal, passwordItem }): JSX.Element => {
   // state
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);

   // hooks
   const handleHidePassword = (): void => setHidePassword(!hidePassword);

   // functions
   const handleCopy = (itemType: string, valueCopied: string) => {
      if (valueCopied === "n/a" || valueCopied === "N/A") {
         toast.error("There is no value to copy");
      } else {
         toast.success(`The ${itemType} has been copied to the clipboard`);
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Header closeButton>
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
                  {passwordItem?.attributes.title}
               </h3>
            </div>
         </Modal.Header>

         <Modal.Body>
            <div className="w-100 d-flex flex-column">
               <div className={`shadow ${styles.item}`}>
                  <p className="mb-1 weight-700 size-18">Username</p>
                  <span className="weight-400 size-16 text-break">{passwordItem?.attributes.username}</span>

                  <CopyToClipboard
                     text={passwordItem?.attributes.username === undefined ? "n/a" : passwordItem?.attributes.username}
                     onCopy={() =>
                        handleCopy(
                           "username",
                           passwordItem?.attributes.username === undefined ? "n/a" : passwordItem?.attributes.username
                        )
                     }
                  >
                     <CopyIcon className={styles.copyIcon} />
                  </CopyToClipboard>
               </div>

               <div className={`shadow ${styles.item}`}>
                  <p className="mb-1 weight-700 size-18">Email</p>
                  <span className="weight-400 size-16 text-break">{passwordItem?.attributes.email}</span>

                  <CopyToClipboard
                     text={passwordItem?.attributes.email === undefined ? "n/a" : passwordItem?.attributes.email}
                     onCopy={() =>
                        handleCopy(
                           "email",
                           passwordItem?.attributes.email === undefined ? "n/a" : passwordItem?.attributes.email
                        )
                     }
                  >
                     <CopyIcon className={styles.copyIcon} />
                  </CopyToClipboard>
               </div>

               <div className={`shadow ${styles.item}`}>
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
                     <span className={`weight-400 size-16 text-break`}>{passwordItem?.attributes.password}</span>
                  )}

                  <CopyToClipboard
                     text={passwordItem?.attributes.password === undefined ? "n/a" : passwordItem?.attributes.password}
                     onCopy={() =>
                        handleCopy(
                           "password",
                           passwordItem?.attributes.password === undefined ? "n/a" : passwordItem?.attributes.password
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
