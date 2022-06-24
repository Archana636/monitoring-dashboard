import React from "react";
import { CircleWavyWarning } from "phosphor-react";
import styles from "./indicator.module.scss";

export function Error(props) {
  const { text } = props;
  return (
    <div className={`${styles.container}`}>
      <CircleWavyWarning
        size={32}
        className={`${styles.icon} ${styles.warnIcon}`}
      />
      <p>{text}</p>
    </div>
  );
}
