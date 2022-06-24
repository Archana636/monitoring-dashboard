export const internet_speed = (datacenter) =>
  `https://dev-admin.zybisys.com/noc/internet_speed?datacenter=${datacenter}`;
export const internal_host = (datacenter) =>
  `https://dev-admin.zybisys.com/noc/internet_bw?datacenter=${datacenter}`;
export const top_apps = (datacenter) =>
  `https://dev-admin.zybisys.com/noc/internet_apps?datacenter=${datacenter}`;
export const alert_notification = (datacenter, index) =>
  `https://dev-admin.zybisys.com/noc/alert-notification?datacenter=${datacenter}&flag_index=${index}&component=alert-notification`;
export const host_count = (datacenter) =>
  `https://dev-admin.zybisys.com/noc/instance_count?datacenter=${datacenter}`;

export const host_count1 = (datacenter1) =>
  `https://dev-admin.zybisys.com/noc/instance_count?datacenter=${datacenter1}`;
export const host_count2 = (datacenter2) =>
  `https://dev-admin.zybisys.com/noc/instance_count?datacenter=${datacenter2}`;

//total:
// export const total = (datacenter) =>
//   `https://dev-admin.zybisys.com/noc/internet_speed?datacenter=${datacenter}`;
