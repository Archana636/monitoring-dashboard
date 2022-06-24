export const convertBYTE_to_MB = (data) => {
  //1024*1024 byte = 1Mb
  const mb = data / (1024 * 1024);
  return mb.toFixed(2);
};
export const convertBYTE_to_MBps = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};

export function convertBYTES_to_MBps(data) {
  let label = "";

  if (data) {
    label += " ";
  }
  if (data !== null) {
    let value = data * 8;
    let magabitdata = value / 1000000; // covert bit to Megabit
    if (magabitdata < 1) {
      // covert Megabit to Kilobit
      value = parseFloat((magabitdata * 1000).toFixed(2)) + " Kbps";
    } else if (magabitdata > 1000) {
      // covert Megabit to Gigabit
      value = parseFloat((magabitdata / 1000).toFixed(2)) + " Gbps";
    } else {
      value = parseFloat(magabitdata.toFixed(2)) + " Mbps";
    }
    label += value;
  }
  return label;
}
