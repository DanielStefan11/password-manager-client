import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
   show: boolean;
   toggleModal: () => void;
}

const RemovePwdConfirmation: React.FC<Props> = ({ show, toggleModal }): JSX.Element => {
   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body>
            <h3 className="text-center size-20 weight-700 dark-blue-text">
               Are you sure you want to delete the password?
            </h3>
         </Modal.Body>

         <Modal.Footer>
            <div className="w-100 d-flex align-items-center justify-content-center">
               <button className={`confirmModalButton`}>Delete</button>

               <span className="cancel-span">Cancel</span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default RemovePwdConfirmation;
