import React from "react";
import styles from "./ErrorPage.module.scss";
import { ReactComponent as ErrorImage } from "../../Assets/Error/error.svg";
import { appRoutes } from "../../Utils/appRoutes";
import { useNavigate } from "react-router-dom";
import { getJWT } from "../../Utils/authorization";

const ErrorPage: React.FC = (): JSX.Element => {
   // hooks
   const navigate = useNavigate();

   // functions
   const handleGoBack = () => {
      if (getJWT) {
         navigate(appRoutes.vault);
      } else {
         navigate(appRoutes.authenticate);
      }
   };

   return (
      <div className={styles.errorPage}>
         <div className={`largeContainer h-100 d-flex flex-column align-items-center justify-content-center`}>
            <ErrorImage className={styles.errorImage} />
            <h3 className="mt-4 mb-5 text-center size-30 weight-700">
               Sorry, the page you were looking for was not found
            </h3>
            <button className={styles.backButton} onClick={handleGoBack}>
               Go back
            </button>
         </div>
      </div>
   );
};

export default ErrorPage;
