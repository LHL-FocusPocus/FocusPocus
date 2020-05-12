const createDonutData = function (data) {
  const donutArr = [];
  data.map((obj) => {
    const donutObj = {};
    donutObj["website"] = obj.website;
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
    donutObj["time"] = minutes;
    donutArr.push(donutObj);
  });
  return donutArr;
};

const createChartData = function (data) {
  const chartArr = [];

  data.map((obj) => {
    const chartObj = {};
    // let date = "";
    // date += obj.date;
    // console.log(obj.date.getYear(), obj.date.getMonth(), obj.date.getDate());
    // console.log(obj.date.toString());
    // console.log(obj.date);
    chartObj["date"] = obj.date;
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
    chartObj["time"] = minutes;
    chartArr.push(chartObj);
  });
  return chartArr;
};

module.exports = { createDonutData, createChartData };
