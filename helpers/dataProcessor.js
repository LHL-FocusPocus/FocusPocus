const createDonutData = function (data) {
  const dataArr = [];

  data.map((obj) => {
    const dataObj = {};
    dataObj["website"] = obj.website;
    processTime(obj, dataObj, dataArr);
  });
  return dataArr;
};

const createChartData = function (data) {
  const dataArr = [];

  data.map((obj) => {
    const dataObj = {};
    dataObj["date"] = obj.date;
    processTime(obj, dataObj, dataArr);
  });
  return dataArr;
};

const createBoardData = function (data) {
  const dataArr = [];

  data.map((obj) => {
    const dataObj = {};
    dataObj["name"] = obj.name;
    processTime(obj, dataObj, dataArr);
  });
  return dataArr;
};

const processTime = function (obj, dataObj, dataArr) {
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

module.exports = {
  createDonutData,
  createChartData,
  createBoardData,
};
