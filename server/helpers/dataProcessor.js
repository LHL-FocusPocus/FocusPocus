// Helper function to manage obj:keys data and change all time to minutes
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

// Helper function to remove 'www.' and '.com' from URLs to determine URL's name
const extractNameFromURL = function (url) {
  const remPrefix = url.split("www.").join("");
  const remSuffix = remPrefix.split(".")[0];
  const name = remSuffix.charAt(0).toUpperCase() + remSuffix.slice(1);
  return name;
};

// Helper function to remove "www." if a host_name has it
const remPrefix = function (host_name) {
  return host_name.split("www.").join("");
};

module.exports = { compileData, extractNameFromURL, remPrefix };
