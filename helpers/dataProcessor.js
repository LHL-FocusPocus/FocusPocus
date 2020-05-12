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

module.exports = { createDonutData };
