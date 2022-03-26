import React from "react";
import { Modal } from "react-bootstrap";
import { useDarkModeContext } from "../../Context/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

interface IProps {
   show: boolean;
   toggleModal: () => void;
}

const LogoutConfirmation: React.FC<IProps> = ({ show, toggleModal }): JSX.Element => {
   // hooks
   const navigate = useNavigate();
   const darkModeContext = useDarkModeContext();

   // functions
   const logout = () => {
      localStorage.removeItem("jwt");
      navigate(appRoutes.authenticate);
      toggleModal();
      window.location.reload();
   };

   return (
      <Modal centered show={show} onHide={toggleModal}>
         <Modal.Body className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <h3 className="text-center size-20 weight-700 primary-blue-text">Are you sure you want to logout?</h3>
         </Modal.Body>

         <Modal.Footer className={`${darkModeContext?.darkMode ? "elementBgDarkMode" : "modalLightMode"}`}>
            <div className="w-100 d-flex align-items-center justify-content-center">
               <button
                  className={`${darkModeContext?.darkMode ? "confirmModalButtonDM" : "confirmModalButton"}`}
                  onClick={logout}
               >
                  Logout
               </button>

               <span className="cancel-span" onClick={toggleModal}>
                  Cancel
               </span>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default LogoutConfirmation;
