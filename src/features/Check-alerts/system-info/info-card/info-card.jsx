import React from "react";
import styles from "./info-card.module.scss";
import { InfoBox } from "../info-box/info-box";

export function InstanceInfo(props) {
  const { total_host, down_host, up_host } = props;
  return (
    <div className={`${styles.card}`}>
      <h2>Instances</h2>
      <div className={`${styles.boxContainer}`}>
        <InfoBox
          title="Total"
          text={total_host}
          className={`${styles.total}`}
        />
        <InfoBox title="Up" text={up_host} className={`${styles.up}`} />
        <InfoBox title="Down" text={down_host} className={`${styles.down}`} />
      </div>
    </div>
  );
}
export function ServiceInfo(props) {
  const { crit, ok, warn } = props;
  return (
    <div className={`${styles.card}`}>
      <h2>Services</h2>
      <div className={`${styles.boxContainer}`}>
        <InfoBox title="Ok" text={ok} className={`${styles.ok}`} />
        <InfoBox title="Crit" text={crit} className={`${styles.critical}`} />
        <InfoBox title="Warn" text={warn} className={`${styles.warn}`} />
      </div>
    </div>
  );
}
