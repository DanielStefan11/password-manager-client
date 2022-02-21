import React from "react";
import styles from "./ToggleButton.module.scss";

const ToggleButton: React.FC = (): JSX.Element => {
   return (
      <label className={styles.toggleWrapper}>
         <input
            type="checkbox"
            // checked={darkMode}
            className={styles.toggleInput}
            // onChange={handleToggleDarkMode}
         />
         <span className={styles.toggleSlider}></span>
      </label>
   );
};

export default ToggleButton;
