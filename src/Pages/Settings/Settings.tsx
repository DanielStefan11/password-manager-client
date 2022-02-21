import React from "react";
import styles from "./Settings.module.scss";
import PageHeading from "../../Components/PageHeading/PageHeading";
import ToggleButton from "../../Components/ToggleButton/ToggleButton";

const Settings: React.FC = (): JSX.Element => {
   return (
      <div className={`page`}>
         <PageHeading />

         <div className="mt-5 d-flex flex-wrap">
            <div className={`shadow ${styles.box}`}>
               <h4 className="text-center mb-4 size-26 weight-700">Enable dark mode</h4>

               <div className="w-100 d-flex justify-content-center">
                  <ToggleButton />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
