import React from "react";
import { Modal } from "react-bootstrap";
import { Password } from "../../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured, passwordDeletedSuccess } from "../../Utils/notifications";
import { usePasswordsContext } from "../../Context/PasswordsProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface Props {
   show: boolean;
   toggleModal: () => void;
   passwordItem?: Password;
}

const RemovePwdConfirmation: React.FC<Props> = ({ show, toggleModal, passwordItem }): JSX.Element => {
   // hooks
   const passwordsContext = usePasswordsContext();
   const darkModeContext = useDarkModeContext();

   // functions
   const handleDeletePassword = async () => {
      const requestBody = {
         headers: {
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
         },
         data: passwordItem,
      };

      try {
         await axios.delete(
            process.env.REACT_APP_PASSWORD_MANAGER_URL + `/api/passwords/${passwordItem?.id}`,
            requestBody
         );
         toggleModal();
         toast.success(passwordDeletedSuccess);
         passwordsContext?.refreshData();
      } catch (err) {
         console.log(err);
         toast.error(errorOccured);
         toggleModal();
      }
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <h3 className="text-center size-20 weight-700 primary-blue-text">
               Are you sure you want to delete "{passwordItem?.attributes.title}" password?
            </h3>
         </Modal.Body>

         <Modal.Footer className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <div className="w-100 d-flex align-items-center justify-content-center">
               <button
                  className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
                  onClick={handleDeletePassword}
               >
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
