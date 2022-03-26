import React, { useState } from "react";
import PageHeading from "../../Components/PageHeading/PageHeading";
import { ReactComponent as EmptyListImage } from "../../Assets/Global/not-found.svg";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { useNotesContext } from "../../Context/NotesProvider";
import FadeLoader from "react-spinners/FadeLoader";
import { Row, Col } from "react-bootstrap";
import NotePreview from "../../Components/NotePreview/NotePreview";
import { BsPlusLg as PlusIcon } from "react-icons/bs";
import CreateNote from "../../Components/NoteModal/CreateNote";

const Notes: React.FC = (): JSX.Element => {
   // state
   const [createNoteModal, setCreateNoteModal] = useState<boolean>(() => false);

   // hooks
   const darkModeContext = useDarkModeContext();
   const notesContext = useNotesContext();

   // functions
   const handleToggleCreateNote = (): void => setCreateNoteModal(!createNoteModal);

   return (
      <>
         {/* modals */}
         <CreateNote show={createNoteModal} toggleModal={handleToggleCreateNote} />

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
               <>
                  {notesContext?.notes === [] ||
                  notesContext?.notes === null ||
                  notesContext?.notes === undefined ||
                  notesContext.notes.length === 0 ? (
                     <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                        <EmptyListImage className="empty-list-image" />
                        <h2 className={`text-center ${darkModeContext?.darkMode && "text-white"}`}>
                           You have not added any notes
                        </h2>
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
               </>
            )}

            {/* add note button */}
            <div className={`shadow addButton`} onClick={handleToggleCreateNote}>
               <PlusIcon />
            </div>
         </div>
      </>
   );
};

export default Notes;
