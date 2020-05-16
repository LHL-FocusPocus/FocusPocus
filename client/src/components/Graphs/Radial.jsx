import React, { useEffect } from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 45%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${"" /* padding: 3em; */}
  height: 400px;
  padding-bottom: 6em;
  padding-top: 2em;
  @media (max-width: 1300px) {
    order: 2;
    flex: 1 100%;
  }
`;

const Card = styled(Paper)`
  height: 400px;
`

const Chart = styled.div`
  ${'' /* align-self: center;
  height: 100%;
  width: 100%; */}

  align-self: center;
  width: 100%;
  height: 100%;
  transform: translateY(30px);
  padding-bottom: 5%;
  ${'' /* padding-right: 5%; */}
  ${'' /* padding-bottom: 8%; */}
  &:after {
    ${'' /* height: 120%; */}
    ${'' /* content: "";
    position: absolute;
    transform: translateX(105px) translateY(-24px);
    height: 475px;
    width: 775px;
    border: 1px solid green;
    border-radius: 1em; */}

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

    chart.scale = 1.1;
    chart.paddingRight = 60;


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

    let title = chart.titles.create();
    title.text = "Blacklisted Site Visits";
    title.fontSize = 20;
    title.marginBottom = 30;

    categoryAxis.sortBySeries = series;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;
  }, [radialData]);

  return (
    <Card elevation={24} component={Wrapper}>
      <Chart id="radial-chart"></Chart>
    </Card>
  );
}
