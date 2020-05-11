import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Wrapper = styled(Box)`
  flex: 1 40vw;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    flex: 1 100%;
    order: 5;
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 100%;
  height: 100%;
`;

export default function LineGraph() {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("line_chart", am4charts.XYChart);

    // Enable chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    // Enable scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    // Data must in array with date&value keys
    // day 1 = arr[0], day 2 = arr[1], etc
    // Need data for the last 30 days from today (including today)
    // Time should be in MINUTES (since they're daily values - hours makes less sense)
    chart.data = [
      {
        date: "2020-04-26",
        time: 8,
      },
      {
        date: "2020-04-27",
        time: 10,
      },
      {
        date: "2020-04-28",
        time: 12,
      },
      {
        date: "2020-04-29",
        time: 14,
      },
      {
        date: "2020-04-30",
        time: 11,
      },
      {
        date: "2020-05-01",
        time: 6,
      },
      {
        date: "2020-05-02",
        time: 7,
      },
      {
        date: "2020-05-03",
        time: 9,
      },
      {
        date: "2020-05-04",
        time: 13,
      },
      {
        date: "2020-05-05",
        time: 15,
      },
      {
        date: "2020-05-06",
        time: 19,
      },
      {
        date: "2020-05-07",
        time: 21,
      },
      {
        date: "2020-05-08",
        time: 22,
      },
      {
        date: "2020-05-09",
        time: 20,
      },
      {
        date: "2020-05-10",
        time: 18,
      },
      {
        date: "2020-05-11",
        time: 14,
      }
    ];

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "[bold font-size: 17px]Minutes Spent: {valueY}[/]";
    series.dataFields.valueY = "time";
    series.dataFields.dateX = "date";
    series.strokeDasharray = 3;
    series.strokeWidth = 2;
    series.strokeOpacity = 0.3;
    series.strokeDasharray = "3,3";

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color("#fff");
    bullet.setStateOnChildren = true;
    bullet.propertyFields.fillOpacity = "opacity";
    bullet.propertyFields.strokeOpacity = "opacity";

    var hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 1.7;

    // Initial zoom once chart is ready
    chart.events.once("datavalidated", function () {
      const today = new Date()
      series.xAxis.zoomToDates(today.setDate(today.getDate() - 7), new Date());
    });

  }, []);

  return (
    <Wrapper>
      <Chart id="line_chart"></Chart>
    </Wrapper>
  );
}
