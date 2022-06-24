import React from "react";
import styles from "./info-box.module.scss";

export function InfoBox(props) {
  const { className, title, text } = props;
  return (
    <div className={`${styles.box} ${className}`}>
      <p>{title}</p>
      <span>{text}</span>
    </div>
  );
}
