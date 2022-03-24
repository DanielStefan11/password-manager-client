import React from "react";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { useNotesContext } from "../../Context/NotesProvider";
import FadeLoader from "react-spinners/FadeLoader";
import { Row, Col } from "react-bootstrap";
import NotePreview from "../../Components/NotePreview/NotePreview";
import { BsPlusLg as PlusIcon } from "react-icons/bs";

const Notes: React.FC = (): JSX.Element => {
   // hooks
   const darkModeContext = useDarkModeContext();
   const notesContext = useNotesContext();

   return (
      <div
         className={`pb-5 page darkModeTransition position-relative ${
            darkModeContext?.darkMode ? "backgroundDarkMode" : "pageLightMode"
         }`}
      >
         <PageHeading />

         {notesContext?.loading ? (
            <div className={`loadingContainer`}>
               <FadeLoader height={30} color="#33cccc" />
               <h5 className="mt-4 size-26 weight-700 primary-blue-text">Loading...</h5>
            </div>
         ) : (
            <Row xs={1} sm={2} md={2} lg={3} xxl={4} className="mt-5">
               {notesContext?.notes?.map(note => (
                  <Col key={note.id}>
                     <NotePreview noteData={note} />
                  </Col>
               ))}
            </Row>
         )}

         {/* add note button */}
         <div className={`shadow addButton`}>
            <PlusIcon />
         </div>
      </div>
   );
};

export default Notes;
