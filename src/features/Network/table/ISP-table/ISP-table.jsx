import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import React from "react";
import styles from "./table.module.scss";
import { Table } from "../../../UI/table/table";
import {
  RECEIVED_COLOR,
  TRANSMITTED_COLOR,
} from "../../../../utils/constants.util.js";

const data = [
  { readable: "cube.tradejini.com", metric: "12.35" },
  { readable: "154.83.3.175", metric: "18.35 " },
  { readable: "zebullin", metric: "12.35 " },
  { readable: "nsg-static-65.0.212.90-cube-trade-457", metric: "12.35 " },
  { readable: "65.0.212.90", metric: "12.35 " },
];

export function ISPTable(props) {
  return (
    <section className={`${styles.container}`}>
      <h2 className={`${styles.tableTitle}`}>ISP</h2>
      <hr />
      <div className={`${styles.table}`}>
        <div className={`${styles.col} ${styles.col_1}`}>
          <div className={`${styles.header}`}>
            <ArrowCircleUp
              color={RECEIVED_COLOR}
              size={26}
              weight="fill"
              className={`${styles.icon}`}
            />
            <p>Received</p>
          </div>
          <Table datas={data} />
        </div>
        <div className={`${styles.col} ${styles.col_2}`}>
          <div className={`${styles.header}`}>
            <ArrowCircleDown
              color={TRANSMITTED_COLOR}
              size={26}
              weight="fill"
              className={`${styles.icon}`}
            />
            <p>Transmitted</p>
          </div>
          <Table datas={data} />
        </div>
      </div>
    </section>
  );
}
