import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Password } from "../../Interfaces/GlobalInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { errorOccured, passwordDeletedSuccess } from "../../Utils/notifications";
import { usePasswordsContext } from "../../Context/PasswordsProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { getJWT } from "../../Utils/authorization";
import PulseLoader from "react-spinners/PulseLoader";

interface Props {
   show: boolean;
   toggleModal: () => void;
   passwordItem?: Password;
}

const RemovePwdConfirmation: React.FC<Props> = ({ show, toggleModal, passwordItem }): JSX.Element => {
   // state
   const [loading, setLoading] = useState<boolean>(() => false);

   // hooks
   const passwordsContext = usePasswordsContext();
   const darkModeContext = useDarkModeContext();

   // functions
   const handleDeletePassword = async () => {
      const requestBody = {
         headers: {
            Authorization: "Bearer " + getJWT,
         },
         data: passwordItem,
      };

      try {
         setLoading(true);
         await axios.delete(
            process.env.REACT_APP_PASSWORD_MANAGER_URL + `/api/passwords/${passwordItem?.id}`,
            requestBody
         );
         toggleModal();
         toast.success(passwordDeletedSuccess, { toastId: "pwd-deleted" });
         passwordsContext?.refreshData();
      } catch (err) {
         toast.error(errorOccured, { toastId: "err-occured" });
         toggleModal();
      } finally {
         setLoading(false);
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

export default RemovePwdConfirmation;
