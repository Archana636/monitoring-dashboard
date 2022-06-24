import React from "react";
import styles from "./table.module.scss";
import { v4 as uuidv4 } from "uuid";
import { convertBYTE_to_MB } from "../../../utils/formatter.util.js";

const Row = (props) => {
  return (
    <div className={`${styles.row}`}>
      <span>{props.readable}</span>
      <span>
        {convertBYTE_to_MB(props.metric)} <span>MB</span>
      </span>
    </div>
  );
};

/**
 * This is a Table component
 * @param {object} props
 * @param {Object[]} props.datas - Array of datas for Rows
 * @param {Object} props.datas[n] - Object key's need to be same as column's title and in same order of columns. Eg: [{name:'Shweta',age:'21',id:21vg},{name:'Veer',age:'20',id:21bg}]
 * @returns Table component
 */
export function Table(props) {
  const { datas } = props;
  return (
    <div className={`${styles.container}`}>
      {datas
        .filter((_, i) => i < 10)
        .map((data) => (
          <Row key={uuidv4()} {...data} />
        ))}
    </div>
  );
}
