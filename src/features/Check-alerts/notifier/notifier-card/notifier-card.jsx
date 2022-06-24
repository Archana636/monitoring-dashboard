import React from "react";
import styles from "./notifier.module.scss";
import { Warning, WarningCircle } from "phosphor-react";

function renderNotifierDetail(data) {
  const [bold, text] = data.split(":");
  if (text) {
    return (
      <p>
        <span>{bold} :</span>
        <span>{text}</span>
      </p>
    );
  } else {
    return (
      <p>
        <span></span>
        <span>{bold}</span>
      </p>
    );
  }
}
export function CriticalNotifier(props) {
  const { data, ip, service, cdate } = props;
  const day = new Date(cdate);
  const day1 = `${day.getDate()}-${
    day.getMonth() + 1
  }-${day.getFullYear()} ${day.getHours()}:${day.getMinutes()}`;
  return (
    <div className={` ${styles.criticalNotifier}`}>
      <div className={`${styles.iconContainer}`}>
        <Warning size={30} weight="fill" />
        <p>Crit</p>
      </div>
      <article className={`${styles.notifierInfo}`}>
        <div className={`${styles.header}`}>
          <h2>
            {ip} - {service}
          </h2>
          <h2>{day1}</h2>
        </div>

        {renderNotifierDetail(data)}
      </article>
    </div>
  );
}
export function WarningNotifier(props) {
  const { data, ip, service, cdate } = props;
  const day = new Date(cdate);
  const day1 = `${day.getDate()}-${
    day.getMonth() + 1
  }-${day.getFullYear()} ${day.getHours()}:${day.getMinutes()}`;

  return (
    <div className={` ${styles.warnNotifier}`}>
      <div className={`${styles.iconContainer}`}>
        <WarningCircle size={30} weight="fill" />
        <p>Warn</p>
      </div>
      <article className={`${styles.notifierInfo}`}>
        <div className={`${styles.header}`}>
          <h2>
            {ip} - {service}
          </h2>
          <h2>{day1}</h2>
        </div>

        {renderNotifierDetail(data)}
      </article>
    </div>
  );
}
