import React, { useState } from "react";
import styles from "../NoteModal.module.scss";
import { FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";
import { useDarkModeContext } from "../../../Context/DarkModeProvider";

interface IProps {
   secureCodeValue: string | undefined;
   updateSecureCodeInput: (e: React.FormEvent<HTMLInputElement>) => void;
   unlock: (e: React.FormEvent) => void;
   closeNote: () => void;
}

const UnlockContent: React.FC<IProps> = ({
   secureCodeValue,
   updateSecureCodeInput,
   unlock,
   closeNote,
}): JSX.Element => {
   // state
   const [hideCode, setHideCode] = useState<boolean>(() => true);

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const handleToggleShowCode = (): void => setHideCode(!hideCode);

   return (
      <div className={`w-100`}>
         <h3 className={`text-center`}>This note is locked!</h3>
         <p className={``}>Insert secure code to unlock the note:</p>

         <form onSubmit={(e: React.FormEvent) => unlock(e)}>
            <div className={styles.inputsWrapper}>
               {hideCode ? (
                  <CloseLock className={`${styles.inputIcons} pointer`} onClick={handleToggleShowCode} />
               ) : (
                  <OpenedLock className={`${styles.inputIcons} pointer`} onClick={handleToggleShowCode} />
               )}
               <input
                  value={secureCodeValue}
                  name="password"
                  type={hideCode ? "password" : "text"}
                  className={`${styles.unlockCodeInput} highlightInput ${
                     darkModeContext?.darkMode ? "inputDarkMode" : "inputLightMode"
                  }`}
                  placeholder="Insert secure code"
                  onChange={e => updateSecureCodeInput(e)}
               />
            </div>
         </form>

         <div className="w-100 d-flex justify-content-center align-items-center">
            <button
               className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
               onClick={unlock}
            >
               Unlock
            </button>

            <span className="cancel-span" onClick={closeNote}>
               Cancel
            </span>
         </div>
      </div>
   );
};

export default UnlockContent;
