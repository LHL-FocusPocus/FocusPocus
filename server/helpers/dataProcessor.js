const compileData = function (data, key) {
  const dataArr = [];
  data.map((obj) => {
    const dataObj = {};
    dataObj[key] = obj[key];
    processTimeToMins(obj, dataObj, dataArr);
  });
  return dataArr;
};

const processTimeToMins = function (obj, dataObj, dataArr) {
  let minutes = 0;
  if (obj.time.days) {
    minutes += obj.time.days * 1440;
  }
  if (obj.time.hours) {
    minutes += obj.time.hours * 60;
  }
  if (obj.time.minutes) {
    minutes += obj.time.minutes;
  }
  if (obj.time.seconds) {
    minutes += obj.time.seconds / 60;
  }
  dataObj["time"] = minutes;
  dataArr.push(dataObj);
};

module.exports = { compileData };
