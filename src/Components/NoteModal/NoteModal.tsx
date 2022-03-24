import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { INote } from "../../Interfaces/GlobalInterfaces";
import UnlockContent from "./sections/UnlockContent";
import ViewContent from "./sections/ViewContent";
import { toast } from "react-toastify";

interface IProps {
   show: boolean;
   toggleModal: () => void;
   noteData: INote;
}

const NoteModal: React.FC<IProps> = ({ show, toggleModal, noteData }): JSX.Element => {
   // state
   const [unlockNote, setUnlockNote] = useState<boolean>(() => false);
   const [secureCodeInput, setSecureCodeInput] = useState<string | undefined>(() => "");

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const handleUnlockNote = (e: React.FormEvent): void => {
      e.preventDefault();

      if (secureCodeInput === "123") {
         setUnlockNote(true);
      } else {
         toast.error("Code is incorrect", { toastId: "98r9uf" });
      }
   };

   const handleCloseNote = (): void => {
      setUnlockNote(false);
      toggleModal();
      setSecureCodeInput("");
   };

   const handleSecureCodeUpdate = (e: React.FormEvent<HTMLInputElement>): void => {
      setSecureCodeInput(e.currentTarget.value);
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            {noteData.attributes.locked && !unlockNote ? (
               <UnlockContent
                  secureCodeValue={secureCodeInput}
                  updateSecureCodeInput={handleSecureCodeUpdate}
                  unlock={(e: React.FormEvent) => handleUnlockNote(e)}
                  closeNote={handleCloseNote}
               />
            ) : (
               <ViewContent noteData={noteData} closeNote={toggleModal} closeLockedNote={handleCloseNote} />
            )}
         </Modal.Body>
      </Modal>
   );
};

export default NoteModal;
