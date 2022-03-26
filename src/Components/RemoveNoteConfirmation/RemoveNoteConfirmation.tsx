import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured, noteDeletedSuccess } from "../../Utils/notifications";
import { getJWT } from "../../Utils/authorization";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { useNotesContext } from "../../Context/NotesProvider";
import { INote } from "../../Interfaces/GlobalInterfaces";
import PulseLoader from "react-spinners/PulseLoader";

interface Props {
   show: boolean;
   toggleModal: () => void;
   noteItem: INote;
}

const RemoveNoteConfirmation: React.FC<Props> = ({ show, toggleModal, noteItem }): JSX.Element => {
   // state
   const [loading, setLoading] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();
   const notesContext = useNotesContext();

   // functions
   const handleDeleteNote = async () => {
      const requestBody = {
         headers: {
            Authorization: "Bearer " + getJWT,
         },
         data: noteItem,
      };

      try {
         setLoading(true);
         await axios.delete(process.env.REACT_APP_PASSWORD_MANAGER_URL + `/api/notes/${noteItem?.id}`, requestBody);
         toggleModal();
         toast.success(noteDeletedSuccess, { toastId: "irp6d" });
         notesContext?.refreshNotesData();
      } catch (err) {
         toast.error(errorOccured, { toastId: "pfro9" });
         toggleModal();
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <h3 className="text-center size-20 weight-700 primary-blue-text">
               Are you sure you want to delete "{noteItem?.attributes.title}" note?
            </h3>
         </Modal.Body>

         <Modal.Footer className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <div className="w-100 d-flex align-items-center justify-content-center">
               <button
                  className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
                  onClick={handleDeleteNote}
               >
                  {loading ? <PulseLoader color="#ffffff" size={12} /> : "Delete"}
               </button>

               <span className="cancel-span" onClick={toggleModal}>
                  Cancel
               </span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default RemoveNoteConfirmation;
