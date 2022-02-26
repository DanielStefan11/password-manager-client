import React from "react";
import styles from "./Pagination.module.scss";
import { AiOutlineArrowLeft as ArrowLeft, AiOutlineArrowRight as ArrowRight } from "react-icons/ai";
import { usePasswordsContext } from "../../Context/PasswordsProvider";

const Pagination: React.FC = (): JSX.Element => {
   // hooks
   const passwordsContext = usePasswordsContext();

   return (
      <div className={styles.pagination}>
         <div className={styles.paginationContainer}>
            {/* Prev */}
            <button
               disabled={passwordsContext?.pageNumber === 1 ? true : false}
               className={`${styles.paginationButton} ${passwordsContext?.pageNumber === 1 && styles.disabledButton}`}
               onClick={() => passwordsContext?.handlePagination("prev")}
            >
               <ArrowLeft />
            </button>

            <span className="mx-4 size-20 weight-700 primary-blue-text">{passwordsContext?.pageNumber}</span>

            {/* Next */}
            <button
               disabled={passwordsContext?.pageNumber === passwordsContext?.paginationData?.pageCount ? true : false}
               className={`${styles.paginationButton} ${
                  passwordsContext?.pageNumber === passwordsContext?.paginationData?.pageCount && styles.disabledButton
               }`}
               onClick={() => passwordsContext?.handlePagination("next")}
            >
               <ArrowRight />
            </button>
         </div>
      </div>
   );
};

export default Pagination;
