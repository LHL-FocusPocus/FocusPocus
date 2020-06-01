import React, { useEffect } from "react";
import { Paper, Box } from "@material-ui/core";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Wrapper = styled(Box)`
  flex: 2;
  display: flex;
  items-align: center;
  justify-content: center;
  margin-bottom: 3em;
  margin-left: 3em;

  @media (max-width: 1300px) {
    flex: 1 100%;
    order: 2;
    margin-left: 0;
  }
`;

const Card = styled(Paper)`
  width: 20vw;
  height: 50vh;
`;

const Chart = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 0.9em; */}
  margin-left: 3.5em;
  margin-top: 2.5em;
  transform: translateY(5px);
`;

export default function LineGraph({ lineData }: any) {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("line_chart", am4charts.XYChart);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.data = lineData;
    chart.scale = 0.93;
    chart.numberFormatter.numberFormat = "#.";

    // Create axes
    const dateAxis: any = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.tooltipDateFormat = "MMM dd, yyyy";
    dateAxis.dateFormats.setKey("day", "dd");
    dateAxis.fontSize = 30;
    dateAxis.tooltip.fontSize = 25;

    const valueAxis: any = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 30;
    valueAxis.tooltip = false;

    const series: any = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "[bold font-size: 30px]Minutes Spent: {valueY}[/]";
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

    // Line Graph title
    let title = chart.titles.create();
    title.text = "Blacklisted Browsing Time";
    title.fontSize = 45;
    title.marginBottom = 15;

    // Initial zoom once chart is ready
    chart.events.once("datavalidated", function () {
      const today = new Date();
      series.xAxis.zoomToDates(today.setDate(today.getDate() - 7), new Date());
    });
  }, [lineData]);

  return (
    <Card component={Wrapper} elevation={23}>
      <Chart id="line_chart"></Chart>
    </Card>
  );
}
