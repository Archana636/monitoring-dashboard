import { HardDrives } from "phosphor-react";
import React, { useEffect, useState } from "react";
import styles from "../assets/style/pages/network.module.scss";
import {
  LineGraph,
  // BarGraph,
  // ISPTable,
  HostTopAppTable,
} from "../features/Network";
import { Empty, Error } from "../features/UI/indicator";
import { internet_speed, internal_host, top_apps } from "../utils/api-util.js";
import { DATACENTER_1, DATACENTER_2 } from "../utils/constants.util";
import axios from "axios";
import { convertBYTES_to_MBps } from "../utils/formatter.util";

const network_get = {
  bandwidth_speed: async (datacenter) => {
    return axios
      .get(internet_speed(datacenter))
      .then((res) => res.data)
      .catch((err) => err);
  },
  internal_host: async (datacenter) => {
    return axios
      .get(internal_host(datacenter))
      .then((res) => res.data)
      .catch((err) => err);
  },
  top_apps: async (datacenter) => {
    return axios
      .get(top_apps(datacenter))
      .then((res) => res.data)
      .catch((err) => err);
  },
  // total: async (datacenter) => {
  //   return axios
  //     .get(total(datacenter))
  //     .then((res) => res.data)
  //     .catch((err) => err);
  // },
};
function Network(props) {
  const [error, setError] = useState({ state: false, message: "" });
  const [datacenter1, setDatacenter1] = useState({
    name: "IN-MUM-WEST-1",
    "internet-graph": null,
    "top-apps": null,
    "internal-host": null,
  });
  const [datacenter2, setDatacenter2] = useState({
    name: "IN-MUM-WEST-2",
    "internet-graph": null,
    "top-apps": null,
    "internal-host": null,
  });

  async function getDatacenter1() {
    try {
      const dataArr = await Promise.all([
        network_get.bandwidth_speed(DATACENTER_1),
        network_get.internal_host(DATACENTER_1),
        network_get.top_apps(DATACENTER_1),
      ]);
      const [bandiwdth_speed, internal_host, top_apps] = dataArr;
      setDatacenter1({
        "internet-graph": bandiwdth_speed.message,
        "internal-host": internal_host.message,
        "top-apps": top_apps.message,
      });
      // console.log("bandwidth_speed", bandiwdth_speed.message);
    } catch (err) {
      window.alert(
        'Something went wrong while getting data for datacenter="IN-MUM-WEST-1'
      );
    }
  }

  async function getDatacenter2() {
    try {
      const dataArr = await Promise.all([
        network_get.bandwidth_speed(DATACENTER_2),
        network_get.internal_host(DATACENTER_2),
        network_get.top_apps(DATACENTER_2),
      ]);
      const [bandiwdth_speed, internal_host, top_apps] = dataArr;
      setDatacenter2({
        "internet-graph": bandiwdth_speed.message,
        "internal-host": internal_host.message,
        "top-apps": top_apps.message,
      });
      // console.log("bandwidth_speed", bandiwdth_speed.message);
    } catch (err) {
      window.alert(
        'Something went wrong while getting data for datacenter="IN-MUM-WEST-2'
      );
    }
  }

  // const data = datacenter1.map((item)=>{

  // })
  // console.log("total", datacenter1.total);
  // console.log(datacenter1);
  // console.log(datacenter2);
  useEffect(() => {
    let timer = null;
    getDatacenter1();
    getDatacenter2();

    timer = setInterval(() => {
      let now_sec_over = new Date().getSeconds();
      if (!now_sec_over) {
        getDatacenter1();
        getDatacenter2();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, []);
  useEffect(() => {
    // if (window.WebSocket) {=
    //   // This browser supports websockets
    //   window.alert("Websocket is available");
    // } else {
    //   // This browser does not support websockets
    //   window.alert("Websocket is not available");
    // }
    // ws.onmessage = function (evt) {
    //   const data = JSON.parse(evt.data);
    //   const { datacenter, component, message } = data;
    //   // console.log(data);
    //   // console.log("res from socket", data);
    //   if (
    //     component === "internal-host" ||
    //     component === "top-apps" ||
    //     component === "internet-graph"
    //   ) {
    //     if (datacenter === "IN-MUM-WEST-1") {
    //       setDatacenter1((prevValue) => ({
    //         ...prevValue,
    //         [component]: message,
    //       }));
    //     }
    //     if (datacenter === "IN-MUM-WEST-2") {
    //       setDatacenter2((prevValue) => ({
    //         ...prevValue,
    //         [component]: message,
    //       }));
    //     }
    //   }
    // };
    // ws.onerror = function (evt) {
    //   console.log("err");
    //   if (evt) {
    //     setError({ state: true, message: evt });
    //   } else {
    //     setError({ state: false, message: "Something went wrong" });
    //   }
    // };
    // return () => {
    //   ws.onclose = function (evt) {
    //     console.log("close");
    //   };
    // };
  }, []);

  // useEffect(()=>{
  //   getTotal();
  // },[]);

  return (
    <section className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>Internet </h1>
      {/* <div className={`${styles.datacenter}`}>
        <HardDrives size={25} weight="fill" />
        <h1> {DATACENTER_1} </h1>
      </div> */}
      <div className={`${styles.data3}`}>
        {" "}
        Time : {datacenter1["internet-graph"]?.time?.slice(-1)}
      </div>
      <main className={`${styles.tableContainer}`}>
        {/* //********************  DATACENTER - 1 *********************/}
        <div className={`${styles.col_1}  `}>
          <div className={`${styles.header}`}>
            <HardDrives size={25} weight="fill" />
            <h1 className={`${styles.datacenterName}`}>
              {/* IN-MUM-WEST-1 (ctrlS) */}
              {DATACENTER_1}{" "}
            </h1>
          </div>
          <div className={`${styles.data11}`}>
            <div className={`${styles.data2}`}>
              <span className={`${styles.data6}`}>
                In :
                {convertBYTES_to_MBps(
                  datacenter1["internet-graph"]?.recived?.slice(-1)
                )}
              </span>
              ,{" "}
              <span className={`${styles.data5}`}>
                Out :
                {convertBYTES_to_MBps(
                  datacenter1["internet-graph"]?.transmited?.slice(-1)
                )}
              </span>
              ,{" "}
              <span className={`${styles.data4}`}>
                Total :
                {convertBYTES_to_MBps(
                  datacenter1["internet-graph"]?.total?.slice(-1)
                )}
              </span>{" "}
            </div>
          </div>
          {/* </h1> */}

          <div className={`${styles.graphContainer} `}>
            {Boolean(datacenter1["internet-graph"]) && (
              <LineGraph
                className={`${styles.graph}`}
                {...datacenter1["internet-graph"]}
              />
            )}
            {Boolean(!datacenter1["internet-graph"]) && (
              <Empty text="No data for Internet Graph found" />
            )}
            {Boolean(error.state) && <Error text={error.message} />}
          </div>

          {/* <div className={`${styles.graphContainer}`}>
            <BarGraph className={`${styles.graph}`} />
          </div> */}

          <div className={`${styles.glass} ${styles.infoTableContainer}`}>
            {Boolean(
              datacenter1["top-apps"] || datacenter1["internal-host"]
            ) && (
              <HostTopAppTable
                host={datacenter1["internal-host"]}
                topApps={datacenter1["top-apps"]}
              />
            )}
            {Boolean(
              !(datacenter1["top-apps"] || datacenter1["internal-host"])
            ) && <Empty text="No data for Top Apps & Host found" />}
            {Boolean(error.state) && <Error text={error.message} />}
          </div>

          {/* <div className={`${styles.glass} ${styles.infoTableContainer}`}>
            <ISPTable />
          </div> */}
        </div>

        {/* //********************  DATACENTER - 2 *********************/}
        <div className={`${styles.col_2} `}>
          <div className={`${styles.header}`}>
            <HardDrives size={25} weight="fill" />
            <h1 className={`${styles.datacenterName}`}>
              {/* IN-MUM-WEST-2 (Netmagic) */}
              {DATACENTER_2}{" "}
            </h1>
          </div>
          <div className={`${styles.data11}`}>
            <div className={`${styles.data2}`}>
              <span className={`${styles.data6}`}>
                In :
                {convertBYTES_to_MBps(
                  datacenter2["internet-graph"]?.recived?.slice(-1)
                )}
              </span>
              ,{" "}
              <span className={`${styles.data5}`}>
                Out :
                {convertBYTES_to_MBps(
                  datacenter2["internet-graph"]?.transmited?.slice(-1)
                )}
              </span>
              ,{" "}
              <span className={`${styles.data4}`}>
                Total :
                {convertBYTES_to_MBps(
                  datacenter2["internet-graph"]?.total?.slice(-1)
                )}
              </span>{" "}
            </div>
          </div>
          {/* </h1> */}

          <div className={`${styles.graphContainer}`}>
            {Boolean(datacenter2["internet-graph"]) && (
              <LineGraph
                className={`${styles.graph}`}
                {...datacenter2["internet-graph"]}
              />
            )}
            {Boolean(!datacenter2["internet-graph"]) && (
              <Empty text="No data for Internet Graph found" />
            )}
            {Boolean(error.state) && <Error text={error.message} />}
          </div>

          {/* <div className={`${styles.graphContainer}`}>
            <BarGraph className={`${styles.graph}`} />
          </div> */}

          <div className={`${styles.glass} ${styles.infoTableContainer}`}>
            {Boolean(
              datacenter2["top-apps"] || datacenter2["internal-host"]
            ) && (
              <HostTopAppTable
                host={datacenter2["internal-host"]}
                topApps={datacenter2["top-apps"]}
              />
            )}
            {Boolean(
              !(datacenter2["top-apps"] || datacenter2["internal-host"])
            ) && <Empty text="No data for Top Apps & Host found" />}
            {Boolean(error.state) && <Error text={error.message} />}
          </div>

          {/* <div className={`${styles.glass} ${styles.infoTableContainer}`}>
            <ISPTable />
          </div> */}
        </div>
      </main>
    </section>
  );
}

export { Network };
