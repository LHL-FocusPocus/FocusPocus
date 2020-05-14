import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 49%;
  display: flex;
  items-align: center;
  height: 400px;
  justify-content: center;

  @media (max-width: 1300px) {
    order: 2;
    flex: 1 100%;
  }
`;

const Chart = styled.div`
  align-self: center;
  height: 100%;
  width: 100%;
  padding-right: 13%;
  padding-bottom: 8%;

  @media (max-width: 1300px) {
    padding-right: 0;
  }
`;

export default function Radial({ radialData }) {
  useEffect(() => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("radial-chart", am4charts.RadarChart);

    chart.data = radialData;

    chart.innerRadius = am4core.percent(30);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;

    chart.seriesContainer.zIndex = -10;

    const series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = "name";
    series.dataFields.valueY = "hits";
    series.tooltipText = "Visits: {valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.radarColumn.cornerRadius = 5;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    chart.zoomOutButton.disabled = true;

    series.columns.template.adapter.add("fill", (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;
  }, [radialData]);

  return (
    <Wrapper>
      <Chart id="radial-chart"></Chart>
    </Wrapper>
  );
}
