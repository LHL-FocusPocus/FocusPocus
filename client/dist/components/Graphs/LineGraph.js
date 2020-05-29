var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import { Paper, Box } from "@material-ui/core";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
var Wrapper = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 2;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  margin-bottom: 3em;\n  margin-left: 3em;\n\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: 2;\n    margin-left: 0;\n  }\n"], ["\n  flex: 2;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  margin-bottom: 3em;\n  margin-left: 3em;\n\n  @media (max-width: 1300px) {\n    flex: 1 100%;\n    order: 2;\n    margin-left: 0;\n  }\n"])));
var Card = styled(Paper)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 20vw;\n  height: 50vh;\n"], ["\n  width: 20vw;\n  height: 50vh;\n"])));
var Chart = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: 80%;\n  border-radius: 0.9em; */}\n  margin-left: 3.5em;\n  margin-top: 2.5em;\n  transform: translateY(5px);\n"], ["\n  width: 100%;\n  height: 80%;\n  border-radius: 0.9em; */}\n  margin-left: 3.5em;\n  margin-top: 2.5em;\n  transform: translateY(5px);\n"])));
export default function LineGraph(_a) {
    var lineData = _a.lineData;
    useEffect(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("line_chart", am4charts.XYChart);
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        chart.scrollbarX = new am4core.Scrollbar();
        chart.data = lineData;
        chart.scale = 0.93;
        chart.numberFormatter.numberFormat = "#.";
        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
        dateAxis.renderer.minGridDistance = 40;
        dateAxis.tooltipDateFormat = "MMM dd, yyyy";
        dateAxis.dateFormats.setKey("day", "dd");
        dateAxis.fontSize = 30;
        dateAxis.tooltip.fontSize = 25;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.fontSize = 30;
        valueAxis.tooltip = false;
        var series = chart.series.push(new am4charts.LineSeries());
        series.tooltipText = "[bold font-size: 30px]Minutes Spent: {valueY}[/]";
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
        // Line Graph title
        var title = chart.titles.create();
        title.text = "Blacklisted Browsing Time";
        title.fontSize = 45;
        title.marginBottom = 15;
        // Initial zoom once chart is ready
        chart.events.once("datavalidated", function () {
            var today = new Date();
            series.xAxis.zoomToDates(today.setDate(today.getDate() - 7), new Date());
        });
    }, [lineData]);
    return (React.createElement(Card, { component: Wrapper, elevation: 23 },
        React.createElement(Chart, { id: "line_chart" })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=LineGraph.js.map