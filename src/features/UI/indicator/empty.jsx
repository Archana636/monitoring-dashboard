import React from "react";
import styles from "./indicator.module.scss";
import { ImDrawer2 } from "react-icons/im";

export function Empty(props) {
  const { text } = props;
  return (
    <div className={`${styles.container}`}>
      <ImDrawer2 className={`${styles.icon}`} />
      <p>{text}</p>
    </div>
  );
}
