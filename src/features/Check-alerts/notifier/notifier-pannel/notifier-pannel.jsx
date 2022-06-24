import React, { useState } from "react";
import { BellSimpleRinging } from "phosphor-react";
import styles from "./notifier-pannel.module.scss";
import {
  CriticalNotifier,
  WarningNotifier,
} from "../notifier-card/notifier-card";
import { v4 as uuidv4 } from "uuid";

export function NotifierPannel(props) {
  const { data } = props;

  const warn = data.filter((item) => item.state === "WARNING");
  // console.log(warn);
  const crit = data.filter((item) => item.state === "CRITICAL");

  const new1 = [...crit, ...warn];

  function renderNotifiers() {
    if (window.innerHeight > 600 && window.innerHeight < 700) {
      return new1.slice(0, 4);
    }
    if (window.innerHeight >= 700 && window.innerHeight < 900) {
      return new1.slice(0, 5);
    }
    if (window.innerHeight > 900 && window.innerHeight < 1024) {
      return new1.slice(0, 10);
    }
    if (window.innerHeight > 1024 && window.innerHeight < 1060) {
      return new1.slice(0, 10);
    }
    if (window.innerHeight > 1060) {
      return new1.slice(0, 12);
    }
    return new1.slice(0, 10);
  }
  function renderConditionNotifier() {
    const data = renderNotifiers();
    return data.map((notify) => {
      if (notify.state === "CRITICAL") {
        return <CriticalNotifier {...notify} key={uuidv4()} />;
      }
      if (notify.state === "WARNING") {
        return <WarningNotifier {...notify} key={uuidv4()} />;
      }
    });
  }

  return (
    <div className={`${styles.pannel}`}>
      <div className={`${styles.notifierList}`}>
        {renderConditionNotifier()}
      </div>
    </div>
  );
}
