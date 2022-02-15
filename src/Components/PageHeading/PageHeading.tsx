import React from "react";
import styles from "./PageHeading.module.scss";
import { BsShieldLockFill as VaultIcon } from "react-icons/bs";
import { AiFillStar as FavoritesIcon } from "react-icons/ai";
import { RiLockPasswordFill as GenerateIcon } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../Utils/appRoutes";

const PageHeading: React.FC = (): JSX.Element => {
   const location = useLocation();

   let headingContent: JSX.Element | null;

   switch (location.pathname) {
      case appRoutes.vault:
         headingContent = (
            <>
               <VaultIcon size={30} className="me-2" color="#3c8dbb" />
               <h1 className="mb-0 primary-blue-text size-30 weight-900">Vault</h1>
            </>
         );
         break;

      case appRoutes.favorites:
         headingContent = (
            <>
               <FavoritesIcon size={30} className="me-2" color="#3c8dbb" />
               <h1 className="mb-0 primary-blue-text size-30 weight-900">Favorites</h1>
            </>
         );
         break;

      case appRoutes.passwordGenerator:
         headingContent = (
            <>
               <GenerateIcon size={30} className="me-2" color="#3c8dbb" />
               <h1 className="mb-0 primary-blue-text size-30 weight-900">Password Generator</h1>
            </>
         );
         break;

      default:
         headingContent = null;
   }

   return (
      <div className={`w-100 mt-4 d-flex ${styles.heading}`}>
         <div className="d-flex align-items-center">{headingContent}</div>
      </div>
   );
};

export default PageHeading;
