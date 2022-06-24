import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../assets/style/pages/check-alerts.module.scss";
import { DATACENTER_1, DATACENTER_2 } from "../utils/constants.util";

import { DATACENTER1, DATACENTER2 } from "../utils/constants.util";

import { host_count, alert_notification } from "../utils/api-util.js";
import { host_count1, host_count2 } from "../utils/api-util.js";

import { HardDrives } from "phosphor-react";
import {
  InstanceInfo,
  ServiceInfo,
  NotifierPannel,
} from "../features/Check-alerts";
// const url = "ws://10.192.1.71:9857/echo2";
// const ws = new WebSocket(url);

const checkAlert_get = {
  host_count: async (datacenter) => {
    return axios
      .get(host_count(datacenter))
      .then((res) => res)
      .catch((err) => err);
  },
  alert_notification: async (datacenter, index) => {
    return axios
      .get(alert_notification(datacenter, index))
      .then((res) => res)
      .catch((err) => err);
  },
};
//------
const checkAlert_get1 = {
  host_count1: async (datacenter1) => {
    return axios
      .get(host_count1(datacenter1))
      .then((res) => res)
      .catch((err) => err);
  },
  host_count2: async (datacenter2, index) => {
    return axios
      .get(host_count2(datacenter2, index))
      .then((res) => res)
      .catch((err) => err);
  },
};

export function CheckAlerts() {
  const [datacenter1, setDatacenter1] = useState({
    list: [],
    flag_index: 0,
    total_host: 0,
    up_host: 0,
    down_host: 0,
  });
  const [datacenter2, setDatacenter2] = useState({
    list: [],
    flag_index: 0,
    total_host: 0,
    up_host: 0,
    down_host: 0,
  });

  //   ----------------------------------------------------------------
  const [datacenter01, setDatacenter01] = useState({
    list1: [],
    flag_index: 0,
    total_host: 0,
    up_host: 0,
    down_host: 0,
  });
  const [datacenter02, setDatacenter02] = useState({
    list2: [],
    flag_index: 0,
    total_host: 0,
    up_host: 0,
    down_host: 0,
  });

  async function getHostCount() {
    try {
      const dataArr = await Promise.all([
        checkAlert_get.host_count(DATACENTER_1),
        checkAlert_get.host_count(DATACENTER_2),
      ]);
      const [host_1, host_2] = dataArr;
      setDatacenter1((prevValue) => ({
        ...prevValue,
        ...host_1.data.message,
      }));
      setDatacenter2((prevValue) => ({
        ...prevValue,
        ...host_2.data.message,
      }));
    } catch {}
  }
  //-----
  async function getHostCount1() {
    try {
      const dataArr1 = await Promise.all([
        checkAlert_get1.host_count1(DATACENTER1),
        checkAlert_get1.host_count2(DATACENTER2),
      ]);
      const [host01, host02] = dataArr1;
      setDatacenter01((prevValue) => ({
        ...prevValue,
        ...host01.data.message,
      }));
      setDatacenter02((prevValue) => ({
        ...prevValue,
        ...host02.data.message,
      }));
    } catch {}
  }

  async function getNotifier(flag_1, flag_2) {
    try {
      const dataArr = await Promise.all([
        checkAlert_get.alert_notification(DATACENTER_1, flag_1),
        checkAlert_get.alert_notification(DATACENTER_2, flag_2),
      ]);
      const [notifier_1, notifier_2] = dataArr;
      if (notifier_1.data?.message?.length) {
        setDatacenter1((prevValue) => ({
          ...prevValue,
          list: [...notifier_1.data.message, ...prevValue.list],
          flag_index: notifier_1.data.message[0]?.flag_index,
        }));
      }
      if (notifier_2.data?.message?.length) {
        setDatacenter2((prevValue) => ({
          ...prevValue,
          list: [...notifier_2.data.message, ...prevValue.list],
          flag_index: notifier_2.data.message[0]?.flag_index,
        }));
      }
    } catch {}
  }

  //=----------------------------------------------------------------

  async function getNotifier1(flag_01, flag_02) {
    try {
      const dataArr1 = await Promise.all([
        checkAlert_get1.host_count2(DATACENTER1, flag_01),
        checkAlert_get1.host_count2(DATACENTER2, flag_02),
      ]);
      const [notifier01, notifier02] = dataArr1;
      if (notifier01.data?.message?.length) {
        setDatacenter01((prevValue) => ({
          ...prevValue,
          list1: [...notifier01.data.message, ...prevValue.list1],
          flag_index: notifier01.data.message[0]?.flag_index,
        }));
      }
      if (notifier02.data?.message?.length) {
        setDatacenter02((prevValue) => ({
          ...prevValue,
          list2: [...notifier02.data.message, ...prevValue.list2],
          flag_index: notifier02.data.message[0]?.flag_index,
        }));
        console.log(dataArr1);
      }
    } catch {}
  }

  useEffect(() => {
    let timer;
    clearInterval(timer);
    getHostCount();
    getNotifier(datacenter1.flag_index, datacenter2.flag_index);
    timer = setInterval(() => {
      getNotifier(datacenter1.flag_index, datacenter2.flag_index);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [datacenter1.flag_index, datacenter2.flag_index]);
  // useEffect(() => {
  //   console.log(datacenter1, datacenter2);
  // }, [datacenter1, datacenter2]);
  // useCallback(() => {
  //   window.alert("I am in callback");
  //   ws.onopen = function () {
  //     console.log("open");
  //     window.alert("Sent request for connection");
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log("Check Alert");
  //   window.alert("I am in useEffect");
  //   ws.onmessage = function (evt) {
  //     const data = JSON.parse(evt.data);
  //     const { component, datacenter, message } = data;
  //     console.log(data);
  //     if (component === "alert-notification") {
  //       if (datacenter === "IN-MUM-WEST-1") {
  //         setDatacenter1((prevValue) => ({
  //           ...prevValue,
  //           list: [message, ...prevValue.list],
  //         }));
  //       }
  //       if (datacenter === "IN-MUM-WEST-2") {
  //         setDatacenter2((prevValue) => ({
  //           ...prevValue,
  //           list: [message, ...prevValue.list],
  //         }));
  //       }
  //     }

  //     if (component === "host-count") {
  //       if (datacenter === "IN-MUM-WEST-1") {
  //         setDatacenter1((prevValue) => ({ ...prevValue, ...message }));
  //       }
  //       if (datacenter === "IN-MUM-WEST-2") {
  //         setDatacenter2((prevValue) => ({ ...prevValue, ...message }));
  //       }
  //     }
  //   };
  //   ws.onerror = function (evt) {};

  //   return () => {
  //     ws.onclose = function (evt) {
  //       console.log("close");
  //     };
  //   };
  // }, []);

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>Check Alerts</h1>
      <section className={`${styles.tableContainer}`}>
        <div className={`${styles.col} ${styles.col_1}`}>
          <div className={`${styles.colHeader}`}>
            <HardDrives weight="fill" size={32} />
            <h2>{DATACENTER_1}</h2>
          </div>
          <div className={`${styles.systemStatus}`}>
            <InstanceInfo {...datacenter1} />
            <ServiceInfo ok={"10k"} crit={"200"} warn={"300"} />
          </div>
          <div className={`${styles.table}`}>
            <NotifierPannel data={datacenter1.list} />
          </div>
        </div>
        <div className={`${styles.col} ${styles.col_2}`}>
          <div className={`${styles.colHeader}`}>
            <HardDrives weight="fill" size={32} />
            <h2>{DATACENTER_2}</h2>
          </div>
          <div className={`${styles.systemStatus}`}>
            <InstanceInfo {...datacenter2} />
            <ServiceInfo ok={"5k"} crit={"100"} warn={"150"} />
          </div>
          <div className={`${styles.table}`}>
            <NotifierPannel data={datacenter2.list} />
          </div>
        </div>
      </section>
    </div>
  );
}
