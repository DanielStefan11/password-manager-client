import React from "react";
import styles from "../NoteModal.module.scss";

interface IProps {
   closeNote: () => void;
   closeLockedNote: () => void;
}

const ViewContent: React.FC<IProps> = ({ closeNote, closeLockedNote }): JSX.Element => {
   return (
      <div className={`w-100`}>
         <div className="w-100 d-flex justify-content-center align-items-center">
            <span className="cancel-span" onClick={closeLockedNote}>
               Close
            </span>
         </div>
      </div>
   );
};

export default ViewContent;
