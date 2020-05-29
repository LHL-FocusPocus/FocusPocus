var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
var Chart = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  align-self: center;\n  width: 70%;\n  height: 85%;\n"], ["\n  align-self: center;\n  width: 70%;\n  height: 85%;\n"])));
export default function Shameboard(_a) {
    var shameboard = _a.shameboard;
    useEffect(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("shameboard", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;
        chart.paddingRight = 40;
        chart.scale = 0.95;
        chart.data = shameboard;
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.labels.template.dx = -40;
        categoryAxis.renderer.minWidth = 120;
        categoryAxis.tooltip = false;
        categoryAxis.fontSize = 30;
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.fillOpacity = 0.3;
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.cursorTooltipEnabled = false;
        valueAxis.renderer.baseGrid.strokeOpacity = 0;
        valueAxis.renderer.labels.template.dy = -20;
        valueAxis.renderer.opposite = true;
        valueAxis.fontSize = 30;
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = "time";
        series.dataFields.categoryY = "name";
        series.tooltipText = "{valueX.value}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.dy = -30;
        series.tooltip.fontSize = 40;
        series.columnsContainer.zIndex = 100;
        var columnTemplate = series.columns.template;
        columnTemplate.height = am4core.percent(50);
        columnTemplate.maxHeight = 50;
        columnTemplate.column.cornerRadius(60, 10, 60, 10);
        columnTemplate.strokeOpacity = 0;
        // Shameboard subtitle
        var subtitle = chart.titles.create();
        subtitle.text = "Minutes squandered during past week";
        subtitle.fontSize = 17;
        subtitle.marginBottom = 20;
        subtitle.fontFamily = "Raleway, sans-serif";
        // Shameboard title
        var title = chart.titles.create();
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
        var cursor = new am4charts.XYCursor();
        chart.cursor = cursor;
        cursor.lineX.disabled = true;
        cursor.lineY.disabled = true;
        cursor.behavior = "none";
        var bullet = columnTemplate.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 25;
        bullet.valign = "middle";
        bullet.align = "right";
        bullet.isMeasured = true;
        bullet.interactionsEnabled = false;
        bullet.horizontalCenter = "right";
        bullet.interactionsEnabled = false;
        var outlineCircle = bullet.createChild(am4core.Circle);
        outlineCircle.adapter.add("radius", function (radius, target) {
            var circleBullet = target.parent;
            return circleBullet.circle.pixelRadius + 10;
        });
        var image = bullet.createChild(am4core.Image);
        image.width = 60;
        image.height = 60;
        image.horizontalCenter = "middle";
        image.verticalCenter = "middle";
        image.propertyFields.href = "picture";
        image.adapter.add("mask", function (mask, target) {
            var circleBullet = target.parent;
            return circleBullet.circle;
        });
    }, [shameboard]);
    return React.createElement(Chart, { id: "shameboard" });
}
var templateObject_1;
//# sourceMappingURL=Shameboard.js.map