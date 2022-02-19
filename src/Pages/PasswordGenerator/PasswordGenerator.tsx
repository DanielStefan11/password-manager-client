import React from "react";
import styles from "./PasswordGenerator.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { AiFillEye as RevealPwdIcon } from "react-icons/ai";
import { MdFileCopy as CopyIcon } from "react-icons/md";

const PasswordGenerator: React.FC = (): JSX.Element => {
   return (
      <div className={`page ${styles.generatorPage}`}>
         <PageHeading />

         <div className="w-100 d-flex justify-content-center align-items-center">
            <div className={`shadow ${styles.generator}`}>
               <input
                  type="text"
                  disabled
                  className={`shadow ${styles.passwordInput}`}
                  placeholder="Password will be generated here"
               />

               <div className="mt-3 w-100 d-flex">
                  <button className={`me-1 d-flex align-items-center justify-content-center ${styles.inputButtons}`}>
                     <RevealPwdIcon className="me-2" />
                     <span>View</span>
                  </button>

                  <button className={`d-flex align-items-center justify-content-center ${styles.inputButtons}`}>
                     <CopyIcon className="me-2" />
                     <span>Copy</span>
                  </button>
               </div>

               <div className="mt-4 w-100 d-flex flex-column">
                  <label className="mb-4 w-100 d-flex flex-column">
                     <div className="w-100 d-flex justify-content-between">
                        <span>8</span>
                        <span className="text-center mb-2">Length: 8</span>
                        <span>20</span>
                     </div>

                     <input type="range" step={1} min={8} max={20} className={`w-100 pointer`} />
                  </label>

                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <span className={`weight-700`}>Check All</span>
                     <input type="checkbox" />
                     <span className="checkmark"></span>
                  </label>

                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include </span>Uppercase Letters
                     </p>
                     <input type="checkbox" />
                     <span className="checkmark"></span>
                  </label>

                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include </span>Lowercase Letters
                     </p>
                     <input type="checkbox" />
                     <span className="checkmark"></span>
                  </label>

                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include</span> Numbers
                     </p>
                     <input type="checkbox" />
                     <span className="checkmark"></span>
                  </label>

                  <label className="mb-4 w-100 d-flex align-items-center justify-content-between container">
                     <p className="mb-0">
                        <span className={styles.labelSpan}>Include</span> Symbols
                     </p>
                     <input type="checkbox" />
                     <span className="checkmark"></span>
                  </label>

                  <button className={styles.generateButton}>Generate</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PasswordGenerator;
