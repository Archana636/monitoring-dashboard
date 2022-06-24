// const net = require("net");
import net from "net";
const HOST = "localhost";
const PORT = 9857;

//const HOST = 'localhost';
//const PORT = 1234;

class TCPClient {
  constructor(port, address) {
    this.socket = new net.Socket();
    this.address = address || HOST;
    this.port = port || PORT;
    this.init();
  }

  init() {
    var client = this;
    client.socket.connect(client.port, client.address, () => {
      // console.log(`Client connected to: ${client.address} :  ${client.port}`);
      // client.socket.write('Hello World!');
    });

    client.socket.on("data", function (chunk) {
      console.log(`Data received from the server: ${chunk.toString()}.`);
      // client.end();
    });

    client.socket.on("close", () => {
      // console.log('Client closed');
    });
  }

  sendMessage(message) {
    var client = this;
    return new Promise((resolve, reject) => {
      // console.log('> '+message);
      client.socket.write(message);

      client.socket.on("data", (data) => {
        data = data.toString();

        let recDataObj = JSON.parse(data);
        console.log(recDataObj);
        resolve(recDataObj);

        if (data.toString().endsWith("exit")) {
          client.socket.destroy();
        }
      });

      client.socket.on("error", (err) => {
        console.log("this is an error ", err);
        reject(err);
      });
    });
  }
}

export default TCPClient;
// const ws = new WebSocket("ws://10.192.1.71:9857/echo");
// useCallback(() => {
//   ws.onopen = function () {};
// }, []);
// useEffect(() => {
//   ws.onmessage = function (evt) {
//     const data = JSON.parse(evt.data);
//     const { datacenter, component, message } = data;
//     // console.log(data);
//     console.log("res from socket", data);
//     if (datacenter === "IN-MUM-WEST-1") {
//       setDatacenter1((prevValue) => ({ ...prevValue, [component]: message }));
//     }
//     if (datacenter === "IN-MUM-WEST-2") {
//       setDatacenter2((prevValue) => ({ ...prevValue, [component]: message }));
//     }
//   };

//   ws.onerror = function (evt) {
//     console.log("err");
//     if (evt) {
//       setError({ state: true, message: evt });
//     } else {
//       setError({ state: false, message: "Something went wrong" });
//     }
//   };
//   return () => {
//     ws.onclose = function (evt) {
//       console.log("close");
//     };
//   };
// }, []);
