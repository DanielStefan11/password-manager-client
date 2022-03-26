import React, { useState } from "react";
import styles from "./NotePreview.module.scss";
import { BsFillShieldLockFill as ShieldIcon } from "react-icons/bs";
import { RiDeleteBin5Fill as RemoveIcon } from "react-icons/ri";
import { ImPencil2 as PenIcon } from "react-icons/im";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { INote } from "../../Interfaces/GlobalInterfaces";
import Dotdotdot from "react-dotdotdot";
import NoteModal from "../NoteModal/NoteModal";
import RemoveNoteConfirmation from "../RemoveNoteConfirmation/RemoveNoteConfirmation";

interface INoteData {
   noteData: INote;
}

const NotePreview: React.FC<INoteData> = ({ noteData }): JSX.Element => {
   // states
   const [showNoteModal, setShowNoteModal] = useState<boolean>(() => false);
   const [removeNoteModal, setRemoveNoteModal] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();

   // functions
   const handleMatchCardCover = (noteLocked: boolean): string => {
      if (darkModeContext?.darkMode) {
         return "";
      } else {
         if (noteLocked) {
            return styles.lightLockedCover;
         } else {
            return styles.lightPenCover;
         }
      }
   };

   const handleToggleNoteModal = () => setShowNoteModal(!showNoteModal);

   const handleToggleRemoveNoteModal = () => setRemoveNoteModal(!removeNoteModal);

   return (
      <>
         {/* modals */}
         <NoteModal show={showNoteModal} toggleModal={handleToggleNoteModal} noteData={noteData} />
         <RemoveNoteConfirmation show={removeNoteModal} toggleModal={handleToggleRemoveNoteModal} noteItem={noteData} />

         {/* note preview */}
         <div className={`${styles.notePreview} ${darkModeContext?.darkMode && "elementBgDarkMode"}`}>
            <RemoveIcon className={styles.deleteIcon} size={20} color="#e62e00" onClick={handleToggleRemoveNoteModal} />

            <div className={`${styles.cardCover} ${handleMatchCardCover(noteData.attributes.locked)}`}>
               {noteData.attributes.locked ? (
                  <ShieldIcon color="#6495ed" className="pointer" size={50} onClick={handleToggleNoteModal} />
               ) : (
                  <PenIcon color="#ff9933" size={50} className="pointer" onClick={handleToggleNoteModal} />
               )}
            </div>
            <div className={`${styles.titleCover} ${darkModeContext?.darkMode && styles.darkModeCover}`}>
               <Dotdotdot clamp={2}>
                  <h4 className={`weight-700 primary-blue-text`}>{noteData.attributes.title}</h4>
               </Dotdotdot>
            </div>
         </div>
      </>
   );
};

export default NotePreview;
