import React, { useState } from "react";
import styles from "./NoteModal.module.scss";
import { Modal } from "react-bootstrap";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { errorOccured, errorCreateNote, noteCreatedSuccess } from "../../Utils/notifications";
import { headersObject } from "../../Utils/authorization";
import { useNotesContext } from "../../Context/NotesProvider";
import ToggleButton from "../ToggleButton/ToggleButton";
import { BsFillInfoSquareFill as TitleIcon } from "react-icons/bs";
import { FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";

interface IProps {
   show: boolean;
   toggleModal: () => void;
}

const CreateNote: React.FC<IProps> = ({ show, toggleModal }): JSX.Element => {
   // state
   const [title, setTitle] = useState<string>(() => "");
   const [content, setContent] = useState<string>(() => "");
   const [locked, setLocked] = useState<boolean>(() => false);
   const [loading, setLoading] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();
   const notesContext = useNotesContext();

   // functions
   const handleTitleUpdate = (e: React.FormEvent<HTMLInputElement>): void => setTitle(e.currentTarget.value);

   const handleContentUpdate = (e: React.FormEvent<HTMLTextAreaElement>): void => setContent(e.currentTarget.value);

   const handleLockedUpdate = (): void => setLocked(!locked);

   const resetValues = (): void => {
      setTitle("");
      setContent("");
      setLocked(false);
   };

   const handleCreateNote = async (): Promise<void> => {
      const requestBody = {
         data: {
            title,
            content,
            locked,
         },
      };

      try {
         setLoading(true);
         if (title === "" || content === "") {
            toast.error(errorCreateNote, { toastId: "feuh5" });
         } else {
            await axios.post(process.env.REACT_APP_PASSWORD_MANAGER_URL + "/api/notes", requestBody, headersObject);
            toast.success(noteCreatedSuccess, { toastId: "hjh5bh" });
            toggleModal();
            resetValues();
            notesContext?.refreshNotesData();
         }
      } catch (err) {
         toast.error(errorOccured, { toastId: "09uo" });
      } finally {
         setLoading(false);
      }
   };

   const closeModal = (): void => {
      toggleModal();
      resetValues();
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <>
               <h4 className={`text-center mb-4 weight-400 size-30 primary-blue-text`}>Create note</h4>

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

               {/* lock */}
               <div className="w-100 mt-4 d-flex justify-content-center">
                  <div className="d-flex align-items-center">
                     <OpenedLock className="me-2" size={20} color={!locked ? "#33cccc" : "#a9a9a9"} />
                     <ToggleButton checkState={locked} toggle={handleLockedUpdate} />
                     <CloseLock className="ms-2" size={20} color={locked ? "#33cccc" : "#a9a9a9"} />
                  </div>
               </div>

               {/* control buttons */}
               <div className="w-100 mt-4 d-flex justify-content-center align-items-center">
                  <button
                     className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
                     onClick={handleCreateNote}
                  >
                     {loading ? <PulseLoader color="#ffffff" size={12} /> : "Create"}
                  </button>

                  <span className="cancel-span" onClick={closeModal}>
                     Cancel
                  </span>
               </div>
            </>
         </Modal.Body>
      </Modal>
   );
};

export default CreateNote;
