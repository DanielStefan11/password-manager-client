import React from "react";
import styles from "./NotePreview.module.scss";
import { BsFillShieldLockFill as ShieldIcon } from "react-icons/bs";
import { ImPencil2 as PenIcon } from "react-icons/im";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { INote } from "../../Interfaces/GlobalInterfaces";
import Dotdotdot from "react-dotdotdot";

interface INoteData {
   noteData: INote;
}

const NotePreview: React.FC<INoteData> = ({ noteData }): JSX.Element => {
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

   return (
      <div className={`${styles.notePreview} ${darkModeContext?.darkMode && "elementBgDarkMode"}`}>
         <div className={`${styles.cardCover} ${handleMatchCardCover(noteData.attributes.locked)}`}>
            {noteData.attributes.locked ? (
               <ShieldIcon color="#6495ed" size={50} />
            ) : (
               <PenIcon color="#ff9933" size={50} />
            )}
         </div>
         <div className={`${styles.titleCover} ${darkModeContext?.darkMode && styles.darkModeCover}`}>
            <Dotdotdot clamp={2}>
               <h4 className={`weight-700 primary-blue-text`}>{noteData.attributes.title}</h4>
            </Dotdotdot>
         </div>
      </div>
   );
};

export default NotePreview;
