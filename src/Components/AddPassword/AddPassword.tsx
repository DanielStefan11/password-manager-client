import React, { useRef, useState } from "react";
import styles from "./AddPassword.module.scss";
import { Modal } from "react-bootstrap";
import { FaUser as UserIcon, FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";
import { MdEmail as EmailIcon } from "react-icons/md";
import { FiLink as LinkIcon } from "react-icons/fi";

interface Props {
   show: boolean;
   toggleModal: () => void;
}

const AddPassword: React.FC<Props> = ({ show, toggleModal }): JSX.Element => {
   const [hidePassword, setHidePassword] = useState<boolean>(() => true);

   const siteUrlRef = useRef<HTMLInputElement>(null);
   const usernameRef = useRef<HTMLInputElement>(null);
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   const handleToggleHidePassword = (): void => setHidePassword(!hidePassword);

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body>
            <h2 className={`text-center weight-400 size-30 dark-blue-text`}>Add Password</h2>

            <div className={styles.inputsContainer}>
               <div className={styles.inputsWrapper}>
                  <LinkIcon className={styles.inputIcons} />
                  <input ref={usernameRef} type="text" className={styles.addPswInputs} placeholder="Insert site URL" />
               </div>

               <div className={styles.inputsWrapper}>
                  <UserIcon className={styles.inputIcons} />
                  <input
                     ref={siteUrlRef}
                     type="text"
                     className={styles.addPswInputs}
                     placeholder="Insert your username"
                  />
               </div>

               <div className={styles.inputsWrapper}>
                  <EmailIcon className={styles.inputIcons} />
                  <input ref={emailRef} type="email" className={styles.addPswInputs} placeholder="Insert your email" />
               </div>

               <div className={styles.inputsWrapper}>
                  {hidePassword ? (
                     <CloseLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  ) : (
                     <OpenedLock className={`${styles.inputIcons} pointer`} onClick={handleToggleHidePassword} />
                  )}
                  <input
                     ref={passwordRef}
                     type={hidePassword ? "password" : "text"}
                     className={styles.addPswInputs}
                     placeholder="Insert a password"
                  />
               </div>

               <div className={styles.spanContainer}>
                  <p className={`size-16 weight-400 `}>
                     Or <span className={`size-16 weight-700 dark-blue-text pointer`}>generate random password</span>
                  </p>
               </div>

               <h5 className={`size-18 weight-400`}>Generate favicon (optional):</h5>

               <div className={styles.faviconContainer}>
                  <div className={styles.favicon}>
                     <img src="" alt="webiste icon" />
                  </div>
                  <button className={styles.fetchButton}>Fetch Icon</button>
               </div>
            </div>
         </Modal.Body>

         <Modal.Footer>
            <div className={styles.btnContainer}>
               <button className={styles.addButton}>Add</button>

               <span className="cancel-span" onClick={toggleModal}>
                  Cancel
               </span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default AddPassword;
