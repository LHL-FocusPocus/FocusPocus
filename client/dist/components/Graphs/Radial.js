var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import { Paper, Box } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
var Wrapper = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1 45%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 400px;\n  padding-bottom: 6em;\n  padding-top: 2em;\n  margin-left: 1.5em;\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    margin-left: 0;\n    margin-bottom: 3em;\n  }\n"], ["\n  flex: 1 45%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 400px;\n  padding-bottom: 6em;\n  padding-top: 2em;\n  margin-left: 1.5em;\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    margin-left: 0;\n    margin-bottom: 3em;\n  }\n"])));
var Card = styled(Paper)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 400px;\n"], ["\n  height: 400px;\n"])));
var Chart = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  align-self: center;\n  width: 90%;\n  height: 90%;\n  transform: translateY(18px);\n  padding-bottom: 5%;\n\n  @media (max-width: 1300px) {\n    padding-right: 0;\n  }\n"], ["\n  align-self: center;\n  width: 90%;\n  height: 90%;\n  transform: translateY(18px);\n  padding-bottom: 5%;\n\n  @media (max-width: 1300px) {\n    padding-right: 0;\n  }\n"])));
export default function Radial(_a) {
    var radialData = _a.radialData;
    useEffect(function () {
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("radial-chart", am4charts.RadarChart);
        chart.data = radialData;
        chart.innerRadius = am4core.percent(30);
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
        categoryAxis.fontSize = 25;
        categoryAxis.tooltip = false;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.grid.template.strokeOpacity = 0.08;
        valueAxis.fontSize = 25;
        chart.seriesContainer.zIndex = -10;
        chart.scale = 1.1;
        chart.paddingRight = 60;
        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.dataFields.categoryX = "name";
        series.dataFields.valueY = "hits";
        series.tooltipText = "Visits: {valueY.value}";
        series.columns.template.strokeOpacity = 0;
        series.columns.template.radarColumn.cornerRadius = 5;
        series.columns.template.radarColumn.innerCornerRadius = 0;
        series.fontSize = 25;
        series.tooltip.fontSize = 30;
        chart.zoomOutButton.disabled = true;
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });
        // Radial subtitle
        var subtitle = chart.titles.create();
        subtitle.text = "During past week";
        subtitle.fontSize = 17;
        subtitle.marginBottom = 20;
        subtitle.fontFamily = "Raleway, sans-serif";
        // Radial title
        var title = chart.titles.create();
        title.text = "Blacklisted Site Visits";
        title.fontSize = 40;
        categoryAxis.sortBySeries = series;
        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.behavior = "none";
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
    }, [radialData]);
    return (React.createElement(Card, { elevation: 24, component: Wrapper },
        React.createElement(Chart, { id: "radial-chart" })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Radial.js.map