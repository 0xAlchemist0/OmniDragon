export function timestampToDate(timestamp: any) {
  const newDate = new Date(timestamp * 1000).toLocaleString();

  return newDate;
}

export function dateToTimestamp(time: any) {
  const current = new Date();
  const added = addDays(current, time);
  ///

  const myEpoch = Math.floor(added.getTime() / 1000.0);
  console.log("Logged date:", myEpoch);
  return myEpoch;
}

function addDays(date: any, days: any) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}
