import React, { useEffect } from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

const Wrapper = styled(Box)`
  flex: 1 45%;
  display: flex;
  items-align: center;
  justify-content: center;
  height: 400px;
  padding-bottom: 6em;
  padding-top: 2em;
  margin-left: 1.5em;
  @media (max-width: 1300px) {
    flex: 1 100%;
    margin-left: 0;
    margin-bottom: 3em;
  }
`;

const Card = styled(Paper)`
  height: 400px;
`;

const Chart = styled.div`
  align-self: center;
  width: 90%;
  height: 90%;
  transform: translateY(18px);
  padding-bottom: 5%;

  @media (max-width: 1300px) {
    padding-right: 0;
  }
`;

export default function Radial({ radialData }: any) {

  useEffect(() => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("radial-chart", am4charts.RadarChart);

    chart.data = radialData;

    chart.innerRadius = am4core.percent(30);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
    categoryAxis.fontSize = 25;
    categoryAxis.tooltip = false;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;
    valueAxis.fontSize = 25;

    chart.seriesContainer.zIndex = -10;

    chart.scale = 1.1;
    chart.paddingRight = 60;

    const series: any = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = "name";
    series.dataFields.valueY = "hits";
    series.tooltipText = "Visits: {valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.radarColumn.cornerRadius = 5;
    series.columns.template.radarColumn.innerCornerRadius = 0;
    series.fontSize = 25;
    series.tooltip.fontSize = 30;

    chart.zoomOutButton.disabled = true;

    series.columns.template.adapter.add("fill", (fill = null, target: any) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Radial subtitle
    let subtitle = chart.titles.create();
    subtitle.text = "During past week";
    subtitle.fontSize = 17;
    subtitle.marginBottom = 20;
    subtitle.fontFamily = "Raleway, sans-serif";

    // Radial title
    let title = chart.titles.create();
    title.text = "Blacklisted Site Visits";
    title.fontSize = 40;

    categoryAxis.sortBySeries = series;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

  }, [radialData]);

  return (
    <Card elevation={24} component={Wrapper}>
      <Chart id="radial-chart">
      </Chart>
    </Card>
  );
}
