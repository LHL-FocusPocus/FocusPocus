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

const createBoardData = function (data) {
  const boardArr = [];

  data.map((obj) => {
    const boardObj = {};
    boardObj["name"] = obj.name;
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
    boardObj["time"] = minutes;
    boardArr.push(boardObj);
  });
  return boardArr;
};

const toMinutes = ({ hours, minutes, seconds }) => {
  // console.log("hours", hours)
  // console.log('minutes', minutes)
  // console.log('seconds', seconds)

  let total = 0;
  if (hours) {
    total += hours * 60;
  }
  if (minutes) {
    total += minutes;
  }
  if (seconds) {
    total += seconds / 60;
  }
  // console.log('total', total)
  return total;
};

module.exports = {
  createDonutData,
  createChartData,
  createBoardData,
  toMinutes,
};

// Can create one function for createChart/donut/board data, and pass in the wanted keys (eg. "name" , "date", "website")
// Added a toMinutes function for just the day data