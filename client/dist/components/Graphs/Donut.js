var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Paper, Box } from "@material-ui/core";
var Wrapper = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1 45%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 400px;\n  padding-bottom: 6em;\n  padding-top: 2em;\n  margin-right: 1.5em;\n\n  @media (max-width: 1300px) {\n    margin-right: 0;\n    flex: 1 100%;\n    margin-bottom: 3em;\n  }\n"], ["\n  flex: 1 45%;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n  height: 400px;\n  padding-bottom: 6em;\n  padding-top: 2em;\n  margin-right: 1.5em;\n\n  @media (max-width: 1300px) {\n    margin-right: 0;\n    flex: 1 100%;\n    margin-bottom: 3em;\n  }\n"])));
var Chart = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  align-self: center;\n  width: 90%;\n  height: 90%;\n"], ["\n  align-self: center;\n  width: 90%;\n  height: 90%;\n"])));
var Card = styled(Paper)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 200px;\n  height: 400px;\n"], ["\n  width: 200px;\n  height: 400px;\n"])));
export default function Donut(_a) {
    var donutData = _a.donutData;
    useEffect(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("donutChart", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0;
        chart.data = donutData;
        chart.innerRadius = am4core.percent(40);
        chart.depth = 40;
        chart.scale = 1.1;
        chart.paddingRight = 60;
        chart.paddingTop = 15;
        chart.numberFormatter.numberFormat = "#.  mins";
        // Donut subtitle
        var subtitle = chart.titles.create();
        subtitle.text = "Blocked vs. Non-Blocked Sites";
        subtitle.fontSize = 17;
        subtitle.marginBottom = 30;
        subtitle.fontFamily = "Raleway, sans-serif";
        // Donut title
        var title = chart.titles.create();
        title.text = "Today's Browsing";
        title.fontSize = 40;
        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "time";
        series.dataFields.depthValue = "time";
        series.dataFields.category = "website";
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;
        series.fontSize = 25;
        series.tooltip.fontSize = 30;
    }, [donutData]);
    return (React.createElement(Card, { elevation: 24, component: Wrapper },
        React.createElement(Chart, { id: "donutChart" })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Donut.js.map