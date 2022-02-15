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
import AddPassword from "../../Components/AddPassword/AddPassword";

interface Props {
   password: Password;
}

const PasswordItem: React.FC<Props> = ({ password }): JSX.Element => {
   // state
   const [showEditModal, setShowEditModal] = useState<boolean>(() => false);

   // functions
   const handleCopy = (itemType: string, valueCopied: string) => {
      if (valueCopied === "n/a" || valueCopied === "N/A") {
         toast.error("There is no value to copy");
      } else {
         toast.success(`The ${itemType} has been copied to the clipboard`);
      }
   };

   const handleToggleEditModal = () => setShowEditModal(!showEditModal);

   return (
      <div className={`shadow ${styles.itemLargeScreen}`}>
         <AddPassword show={showEditModal} toggleModal={handleToggleEditModal} edit={true} passwordItem={password} />

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
            <RevealPwdIcon className={`pointer ${styles.revealIcon}`} size={30} color="#3c8dbb" />

            <EditIcon className="pointer" size={30} color="#00008b" onClick={handleToggleEditModal} />

            <OutlineStarIcon className="pointer" size={30} color="#3c8dbb" />

            <RemoveIcon className="pointer" size={30} color="#e62e00" />
         </div>
      </div>
   );
};

export default PasswordItem;
