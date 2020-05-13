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
  height: 400px;
`;

export default function LineGraph({ lineData }) {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("line_chart", am4charts.XYChart);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.data = lineData;

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    const series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "[bold font-size: 17px]Minutes Spent: {valueY}[/]";
    series.dataFields.valueY = "time";
    series.dataFields.dateX = "date";
    series.strokeDasharray = 3;
    series.strokeWidth = 2;
    series.strokeOpacity = 0.3;
    series.strokeDasharray = "3,3";

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color("#fff");
    bullet.setStateOnChildren = true;
    bullet.propertyFields.fillOpacity = "opacity";
    bullet.propertyFields.strokeOpacity = "opacity";

    const hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 1.7;

    // Initial zoom once chart is ready
    chart.events.once("datavalidated", function () {
      const today = new Date();
      series.xAxis.zoomToDates(today.setDate(today.getDate() - 7), new Date());
    });
  }, [lineData]);

  return (
    <Wrapper>
      <Chart id="line_chart"></Chart>
    </Wrapper>
  );
}
