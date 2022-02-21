import React from "react";
import styles from "./ToggleButton.module.scss";

interface Props {
   checkState: boolean | undefined;
   toggle: () => void;
}

const ToggleButton: React.FC<Props> = ({ checkState, toggle }): JSX.Element => {
   return (
      <label className={styles.toggleWrapper}>
         <input type="checkbox" checked={checkState} className={styles.toggleInput} onChange={toggle} />
         <span className={styles.toggleSlider}></span>
      </label>
   );
};

export default ToggleButton;
