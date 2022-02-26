import React, { useState } from "react";
import styles from "./PasswordItem.module.scss";
import TemplateFavicon from "../../Assets/Global/template-icon.png";
import {
   AiFillEye as RevealPwdIcon,
   AiFillEdit as EditIcon,
   AiOutlineStar as OutlineStarIcon,
   AiFillStar as FillStarIcon,
} from "react-icons/ai";
import { RiDeleteBin5Fill as RemoveIcon } from "react-icons/ri";
import { MdFileCopy as CopyIcon } from "react-icons/md";
import { Password } from "../../Interfaces/GlobalInterfaces";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import CreatePassword from "../CreatePassword/CreatePassword";
import RemovePwdConfirmation from "../RemovePwdConfirmation/RemovePwdConfirmation";
import PasswordPreview from "../PasswordPreview/PasswordPreview";
import { errorOccured } from "../../Utils/notifications";
import axios from "axios";
import { usePasswordsContext } from "../../Context/PasswordsProvider";
import { useFavoritesContext } from "../../Context/FavoritesProvider";
import { useDarkModeContext } from "../../Context/DarkModeProvider";

interface Props {
   password: Password;
}

const PasswordItem: React.FC<Props> = ({ password }): JSX.Element => {
   // state
   const [showEditModal, setShowEditModal] = useState<boolean>(() => false);
   const [showDeletePwdModal, setShowDeletePwdModal] = useState<boolean>(() => false);
   const [showPwdPreviewModal, setShowPwdPreviewModal] = useState<boolean>(() => false);

   // hooks
   const passwordContext = usePasswordsContext();
   const favoritesContext = useFavoritesContext();
   const darkModeContext = useDarkModeContext();

   // request objects
   const headersObject = {
      headers: {
         Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
   };

   const requestBody = {
      data: {
         title: password.attributes.title,
         siteUrl: password.attributes.siteUrl,
         username: password.attributes.username,
         email: password.attributes.email,
         password: password.attributes.password,
         faviconAddress: password.attributes.faviconAddress,
         favorite: !password.attributes.favorite,
      },
   };

   // functions
   const handleCopy = (itemType: string, valueCopied: string) => {
      if (valueCopied === "n/a" || valueCopied === "N/A") {
         toast.error("There is no value to copy");
      } else {
         toast.success(`The ${itemType} has been copied to the clipboard`);
      }
   };

   const handleToggleEditModal = () => setShowEditModal(!showEditModal);

   const handleToggleDeletePwdModal = () => setShowDeletePwdModal(!showDeletePwdModal);

   const handleTogglePwdPreviewModal = () => setShowPwdPreviewModal(!showPwdPreviewModal);

   const handleToggleFavorites = async (passwordTitle: string | undefined) => {
      try {
         await axios.put(
            process.env.REACT_APP_PASSWORD_MANAGER_URL + `/api/passwords/${password?.id}`,
            requestBody,
            headersObject
         );
         if (passwordTitle !== undefined) {
            if (password.attributes.favorite) {
               toast.info(`${passwordTitle} password was removed from Favorites`);
            } else {
               toast.info(`${passwordTitle} password was added to Favorites`);
            }
         }
         favoritesContext?.refreshFavorites();
         passwordContext?.refreshData();
      } catch (err) {
         console.log(err);
         toast.error(errorOccured);
      }
   };

   return (
      <div
         className={`shadow darkModeTransition ${styles.item} ${
            darkModeContext?.darkMode ? "elementBgDarkMode" : styles.itemLightMode
         }`}
      >
         <CreatePassword show={showEditModal} toggleModal={handleToggleEditModal} edit={true} passwordItem={password} />
         <RemovePwdConfirmation
            show={showDeletePwdModal}
            toggleModal={handleToggleDeletePwdModal}
            passwordItem={password}
         />
         <PasswordPreview
            show={showPwdPreviewModal}
            toggleModal={handleTogglePwdPreviewModal}
            passwordItem={password}
         />

         {/* small screen pwd identity */}
         <div className={styles.pwdTitleSM}>
            <img
               src={password.attributes.faviconAddress ? password.attributes.faviconAddress : TemplateFavicon}
               alt="site icon"
               className={styles.favicon}
            />
            <span className={`size-24 weight-700 primary-blue-text ${styles.titleSpan}`}>
               {password.attributes.title ? password.attributes.title : "N/A"}
            </span>
         </div>

         {/* favicon */}
         <div className={`${styles.faviconCol} ${styles.col}`}>
            <img
               src={password.attributes.faviconAddress ? password.attributes.faviconAddress : TemplateFavicon}
               alt="site icon"
               className={styles.favicon}
            />
         </div>

         {/* Title */}
         <div className={`${styles.titleCol} ${styles.col}`}>
            <span className={`size-24 weight-700 primary-blue-text ${styles.titleSpan}`}>
               {password.attributes.title ? password.attributes.title : "N/A"}
            </span>
         </div>

         {/* username */}
         <div className={`${styles.usernameCol} ${styles.col} d-flex align-items-center`}>
            <span className={`size-18 weight-400 ${styles.emailSpan}`}>Username</span>
            <CopyToClipboard
               text={password.attributes.username}
               onCopy={() => handleCopy("username", password.attributes.username)}
            >
               <CopyIcon className={styles.copyIcon} />
            </CopyToClipboard>
         </div>

         {/* Email */}
         <div className={`${styles.emailCol} ${styles.col} d-flex align-items-center`}>
            <span className={`size-18 weight-400 ${styles.emailSpan}`}>Email</span>
            <CopyToClipboard
               text={password.attributes.email}
               onCopy={() => handleCopy("email", password.attributes.email)}
            >
               <CopyIcon className={styles.copyIcon} />
            </CopyToClipboard>
         </div>

         {/* Password */}
         <div className={`${styles.passwordCol} ${styles.col}`}>
            <span className="mb-4 size-40 eight-700">......</span>
            <CopyToClipboard
               text={password.attributes.password}
               onCopy={() => handleCopy("password", password.attributes.password)}
            >
               <CopyIcon className={styles.copyIcon} />
            </CopyToClipboard>
         </div>

         {/* Actions */}
         <div className={`${styles.actionsCol} ${styles.col} d-flex align-items-center justify-content-around`}>
            <RevealPwdIcon className={`pointer`} size={30} color="#3c8dbb" onClick={handleTogglePwdPreviewModal} />

            <EditIcon className="pointer" size={30} color="#33cccc" onClick={handleToggleEditModal} />

            {password.attributes.favorite ? (
               <FillStarIcon
                  className="pointer"
                  size={30}
                  color="#ffd700"
                  onClick={() => handleToggleFavorites(password.attributes.title)}
               />
            ) : (
               <OutlineStarIcon
                  className="pointer"
                  size={30}
                  color="#3c8dbb"
                  onClick={() => handleToggleFavorites(password.attributes.title)}
               />
            )}

            <RemoveIcon className="pointer" size={30} color="#e62e00" onClick={handleToggleDeletePwdModal} />
         </div>
      </div>
   );
};

export default PasswordItem;
