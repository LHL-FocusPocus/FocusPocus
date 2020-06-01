import React, { useEffect } from "react";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Chart = styled.div`
  align-self: center;
  width: 70%;
  height: 85%;
`;

export default function Shameboard({ shameboard }: any) {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("shameboard", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.paddingRight = 40;
    chart.scale = 0.95;

    chart.data = shameboard;

    const categoryAxis: any = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dx = -40;
    categoryAxis.renderer.minWidth = 120;
    categoryAxis.tooltip = false;
    categoryAxis.fontSize = 30;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;
    valueAxis.renderer.labels.template.dy = -20;
    valueAxis.renderer.opposite = true;
    valueAxis.fontSize = 30;

    const series: any = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "time";
    series.dataFields.categoryY = "name";
    series.tooltipText = "{valueX.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = -30;
    series.tooltip.fontSize = 40;
    series.columnsContainer.zIndex = 100;

    const columnTemplate = series.columns.template;
    columnTemplate.height = am4core.percent(50);
    columnTemplate.maxHeight = 50;
    columnTemplate.column.cornerRadius(60, 10, 60, 10);
    columnTemplate.strokeOpacity = 0;

    // Shameboard subtitle
    let subtitle = chart.titles.create();
    subtitle.text = "Minutes squandered during past week";
    subtitle.fontSize = 17;
    subtitle.marginBottom = 20;
    subtitle.fontFamily = "Raleway, sans-serif";

    // Shameboard title
    let title = chart.titles.create();
    title.text = "Shameboard";
    title.fontSize = 45;

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      dataField: "valueX",
      min: am4core.color("#e5dc36"),
      max: am4core.color("red"),
    });
    series.mainContainer.mask = undefined;

    const cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    const bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 25;
    bullet.valign = "middle";
    bullet.align = "right";
    bullet.isMeasured = true;
    bullet.interactionsEnabled = false;
    bullet.horizontalCenter = "right";
    bullet.interactionsEnabled = false;

    const outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius = null, target: any) {
      const circleBullet = target.parent;
      return circleBullet.circle.pixelRadius + 10;
    });

    const image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "picture";

    image.adapter.add("mask", function (mask = null, target: any) {
      const circleBullet = target.parent;
      return circleBullet.circle;
    });
  }, [shameboard]);

  return <Chart id="shameboard"></Chart>;
}
