import React, { useState } from "react";
import styles from "./NoteModal.module.scss";
import { Modal } from "react-bootstrap";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { noteEditedSuccess, errorOccured } from "../../Utils/notifications";
import { headersObject } from "../../Utils/authorization";
import { useNotesContext } from "../../Context/NotesProvider";
import ToggleButton from "../ToggleButton/ToggleButton";
import { BsFillInfoSquareFill as TitleIcon } from "react-icons/bs";
import { FaUndoAlt as UndoIcon, FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";

interface IProps {
   show: boolean;
   toggleModal: () => void;
}

const CreateNote: React.FC<IProps> = ({ show, toggleModal }): JSX.Element => {
   // state
   const [title, setTitle] = useState<string>(() => "");
   const [content, setContent] = useState<string>(() => "");
   const [locked, setLocked] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const handleTitleUpdate = (e: React.FormEvent<HTMLInputElement>): void => setTitle(e.currentTarget.value);

   const handleContentUpdate = (e: React.FormEvent<HTMLTextAreaElement>): void => setContent(e.currentTarget.value);

   const handleLockedUpdate = (): void => setLocked(!locked);

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <>
               <h4 className={`text-center mb-4 weight-700`}>Create note</h4>

               {/* Title */}
               <div className={styles.inputsWrapper}>
                  <TitleIcon className={styles.inputIcons} />
                  <input
                     value={title}
                     name="title"
                     type="text"
                     className={`${styles.titleInput} highlightInput ${
                        darkModeContext?.darkMode ? "inputDarkMode" : "inputLightMode"
                     }`}
                     placeholder="Insert note title"
                     onChange={handleTitleUpdate}
                  />
               </div>

               {/* editor */}
               <textarea
                  className={`${styles.contentTextarea} highlightInput ${
                     darkModeContext?.darkMode ? "inputDarkMode" : "inputLightMode"
                  }`}
                  value={content}
                  onChange={handleContentUpdate}
                  placeholder="Insert note content"
               ></textarea>

               <div className="w-100 mt-4 d-flex justify-content-center">
                  <div className="d-flex align-items-center">
                     <OpenedLock className="me-2" size={20} color={!locked ? "#33cccc" : "#3a3a3a"} />
                     <ToggleButton checkState={locked} toggle={handleLockedUpdate} />
                     <CloseLock className="ms-2" size={20} color={locked ? "#33cccc" : "#3a3a3a"} />
                  </div>
               </div>

               {/* control buttons */}
               <div className="w-100 mt-4 d-flex justify-content-center align-items-center">
                  <button className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}>
                     Create
                  </button>

                  <span className="cancel-span">Cancel</span>
               </div>
            </>
         </Modal.Body>
      </Modal>
   );
};

export default CreateNote;
