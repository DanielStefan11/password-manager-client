import React, { useState } from "react";
import styles from "../NoteModal.module.scss";
import { INote } from "../../../Interfaces/GlobalInterfaces";
import ReactMarkdown from "react-markdown";
import { AiFillEdit as EditIcon } from "react-icons/ai";
import { BsFillInfoSquareFill as TitleIcon } from "react-icons/bs";
import { FaUndoAlt as UndoIcon, FaLock as CloseLock, FaUnlockAlt as OpenedLock } from "react-icons/fa";
import { useDarkModeContext } from "../../../Context/DarkModeProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { noteEditedSuccess, errorOccured } from "../../../Utils/notifications";
import { headersObject } from "../../../Utils/authorization";
import { useNotesContext } from "../../../Context/NotesProvider";
import ToggleButton from "../../../Components/ToggleButton/ToggleButton";
import PulseLoader from "react-spinners/PulseLoader";

interface IProps {
   noteData: INote;
   closeNote: () => void;
   closeLockedNote: () => void;
}

const ViewContent: React.FC<IProps> = ({ closeLockedNote, noteData, closeNote }): JSX.Element => {
   // state
   const [enableEdit, setEnableEdit] = useState<boolean>(() => false);
   const [editableTitle, setEditableTitle] = useState<string>(() => noteData.attributes.title);
   const [editableContent, setEditableContent] = useState<string>(() => noteData.attributes.content);
   const [editableLocked, setEditableLocked] = useState<boolean>(() => noteData.attributes.locked);
   const [loading, setLoading] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();
   const notesContext = useNotesContext();

   // functions
   const handleToggleEnableEdit = (): void => setEnableEdit(!enableEdit);

   const handleTitleUpdate = (e: React.FormEvent<HTMLInputElement>): void => setEditableTitle(e.currentTarget.value);

   const handleEditableContentUpdate = (e: React.FormEvent<HTMLTextAreaElement>): void => {
      setEditableContent(e.currentTarget.value);
   };

   const handleLockedUpdate = (): void => setEditableLocked(!editableLocked);

   const handleSaveEditedNote = async (): Promise<void> => {
      const requestBody = {
         data: {
            title: editableTitle,
            content: editableContent,
            locked: editableLocked,
         },
      };

      try {
         setLoading(true);
         await axios.put(
            process.env.REACT_APP_PASSWORD_MANAGER_URL + `/api/notes/${noteData.id}`,
            requestBody,
            headersObject
         );
         toast.success(noteEditedSuccess, { toastId: "kh34" });
         closeNote();
         notesContext?.refreshNotesData();
         // passwordsContext?.refreshData();
      } catch (err) {
         toast.error(errorOccured, { toastId: "err-occured" });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={`w-100`}>
         {enableEdit ? (
            // Edit note content
            <>
               <h4 className={`text-center mb-4 weight-700`}>Edit note</h4>

               {/* undo */}
               <div className="w-100 mb-4 d-flex justify-content-end">
                  <UndoIcon size={20} className="pointer primary-blue-text" onClick={handleToggleEnableEdit} />
               </div>

               {/* Title */}
               <div className={styles.inputsWrapper}>
                  <TitleIcon className={styles.inputIcons} />
                  <input
                     value={editableTitle}
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
                  value={editableContent}
                  onChange={handleEditableContentUpdate}
                  placeholder="Insert note content"
               ></textarea>

               {/* lock */}
               <div className="w-100 mt-4 d-flex justify-content-center">
                  <div className="d-flex align-items-center">
                     <OpenedLock className="me-2" size={20} color={!editableLocked ? "#33cccc" : "#a9a9a9"} />
                     <ToggleButton checkState={editableLocked} toggle={handleLockedUpdate} />
                     <CloseLock className="ms-2" size={20} color={editableLocked ? "#33cccc" : "#a9a9a9"} />
                  </div>
               </div>

               {/* control buttons */}
               <div className="w-100 mt-4 d-flex justify-content-center align-items-center">
                  <button
                     className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
                     onClick={handleSaveEditedNote}
                  >
                     {loading ? <PulseLoader color="#ffffff" size={12} /> : "Save"}
                  </button>

                  <span className="cancel-span" onClick={closeLockedNote}>
                     Cancel
                  </span>
               </div>
            </>
         ) : (
            // View note content
            <>
               <h4 className={`text-center weight-700`}>{noteData.attributes.title}</h4>

               <div className="w-100 d-flex justify-content-between">
                  {noteData.attributes.locked ? (
                     <CloseLock size={20} color="#33cccc" />
                  ) : (
                     <OpenedLock size={20} color="#33cccc" />
                  )}

                  <EditIcon className="pointer primary-blue-text" size={27} onClick={handleToggleEnableEdit} />
               </div>

               <div className={styles.textSheet}>
                  <ReactMarkdown>{noteData.attributes.content}</ReactMarkdown>
               </div>

               <div className="w-100 d-flex justify-content-center align-items-center">
                  <span className="cancel-span" onClick={closeLockedNote}>
                     Close
                  </span>
               </div>
            </>
         )}
      </div>
   );
};

export default ViewContent;
