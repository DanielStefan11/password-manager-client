import React from "react";
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

interface Props {
   password: Password;
}

const PasswordItem: React.FC<Props> = ({ password }): JSX.Element => {
   return (
      <div className={`shadow ${styles.itemLargeScreen}`}>
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
            <CopyIcon className={styles.copyIcon} />
         </div>

         {/* Email */}
         <div className={`${styles.emailCol} ${styles.col} d-flex align-items-center`}>
            <span className={`size-18 weight-400 ${styles.emailSpan}`}>Email</span>
            <CopyIcon className={styles.copyIcon} />
         </div>

         {/* Password */}
         <div className={`${styles.passwordCol} ${styles.col}`}>
            <span className="mb-4 size-40 eight-700">......</span>
            <CopyIcon className={styles.copyIcon} />
         </div>

         {/* Actions */}
         <div className={`${styles.actionsCol} ${styles.col} d-flex align-items-center justify-content-around`}>
            <RevealPwdIcon className="pointer" size={30} color="#3c8dbb" />

            <EditIcon className="pointer" size={30} color="#00008b" />

            <OutlineStarIcon className="pointer" size={30} color="#3c8dbb" />

            <RemoveIcon className="pointer" size={30} color="#e62e00" />
         </div>
      </div>
   );
};

export default PasswordItem;
