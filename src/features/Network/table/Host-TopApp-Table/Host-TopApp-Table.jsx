import React from "react";
import { Table } from "../../../UI/table/table";
import styles from "./host-topApp-table.module.scss";

export function HostTopAppTable(props) {
  const { host, topApps } = props;
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.table_1}`}>
        <h2>Host</h2>
        <hr />
        <Table datas={host || []} />
      </div>
      <div className={`${styles.table_2}`}>
        <h2>Top Apps</h2>
        <hr />
        <Table datas={topApps || []} />
      </div>
    </div>
  );
}
