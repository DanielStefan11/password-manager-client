import React from "react";
import { Modal } from "react-bootstrap";
import { Password } from "../../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured, passwordDeletedSuccess } from "../../Utils/notifications";
import { usePasswordsContext } from "../../Context/PasswordsProvider";

interface Props {
   show: boolean;
   toggleModal: () => void;
   passwordItem?: Password;
}

const RemovePwdConfirmation: React.FC<Props> = ({ show, toggleModal, passwordItem }): JSX.Element => {
   const passwordsContext = usePasswordsContext();

   const handleDeletePassword = async () => {
      const requestBody = {
         headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
         },
         data: passwordItem,
      };

      try {
         await axios.delete(process.env.REACT_APP_DEV_URL + `/api/passwords/${passwordItem?.id}`, requestBody);
         toggleModal();
         toast.success(passwordDeletedSuccess);
         passwordsContext?.fetchPwdAscending();
      } catch (err) {
         console.log(err);
         toast.error(errorOccured);
         toggleModal();
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body>
            <h3 className="text-center size-20 weight-700 dark-blue-text">
               Are you sure you want to delete "{passwordItem?.attributes.title}" password?
            </h3>
         </Modal.Body>

         <Modal.Footer>
            <div className="w-100 d-flex align-items-center justify-content-center">
               <button className={`confirmModalButton`} onClick={handleDeletePassword}>
                  Delete
               </button>

               <span className="cancel-span" onClick={toggleModal}>
                  Cancel
               </span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default RemovePwdConfirmation;
