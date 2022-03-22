import React from "react";
import styles from "../NoteModal.module.scss";
import { INote } from "../../../Interfaces/GlobalInterfaces";
import ReactMarkdown from "react-markdown";

interface IProps {
   noteData: INote;
   closeNote: () => void;
   closeLockedNote: () => void;
}

const ViewContent: React.FC<IProps> = ({ closeLockedNote, noteData }): JSX.Element => {
   return (
      <div className={`w-100`}>
         <h4 className={`text-center weight-700`}>{noteData.attributes.title}</h4>

         <div className={styles.textSheet}>
            <ReactMarkdown>{noteData.attributes.content}</ReactMarkdown>
         </div>

         <div className="w-100 d-flex justify-content-center align-items-center">
            <span className="cancel-span" onClick={closeLockedNote}>
               Close
            </span>
         </div>
      </div>
   );
};

export default ViewContent;
