var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import styled from "styled-components";
import toMinutes from "../../helpers/toMinutes";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Paper, Box } from "@material-ui/core";
var Wrapper = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n\n  @media (max-width: 1300px) {\n    margin-bottom: 3em;\n    flex: 1 100%;\n  }\n"], ["\n  flex: 1;\n  display: flex;\n  items-align: center;\n  justify-content: center;\n\n  @media (max-width: 1300px) {\n    margin-bottom: 3em;\n    flex: 1 100%;\n  }\n"])));
var Card = styled(Paper)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 50vh;\n"], ["\n  width: 100%;\n  height: 50vh;\n"])));
var Chart = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  align-self: center;\n  width: 85%;\n  height: 85%;\n"], ["\n  align-self: center;\n  width: 85%;\n  height: 85%;\n"])));
export default function DailyQuotaUsed(_a) {
    var quota = _a.quota;
    useEffect(function () {
        // Convert quota used/allotment to percentage
        var percentageQuotaUsed;
        if (quota.used) {
            percentageQuotaUsed =
                (toMinutes(quota.used) / toMinutes(quota.allotment)) * 100;
        }
        else {
            percentageQuotaUsed = 0;
        }
        // If user is over quota, replace "%" label with text showing much over they are
        var displayText = function () {
            if (percentageQuotaUsed > 100) {
                return (percentageQuotaUsed - 100).toFixed(0) + "% over quota!";
            }
            return "%";
        };
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("dailyQuota", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0;
        chart.innerRadius = -25;
        var axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 100;
        axis.fontSize = 27;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
        axis.renderer.grid.template.strokeOpacity = 0.3;
        // Chart titles
        var title = chart.titles.create();
        title.text = "Daily Quota Used";
        title.fontSize = 40;
        title.marginBottom = 30;
        // Chart labels
        var label = chart.chartContainer.createChild(am4core.Label);
        label.text = displayText();
        label.fontSize = 35;
        label.align = "center";
        var colorSet = new am4core.ColorSet();
        var range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 60;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = colorSet.getIndex(0);
        range0.axisFill.zIndex = -1;
        var range1 = axis.axisRanges.create();
        range1.value = 60;
        range1.endValue = 80;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = colorSet.getIndex(12);
        range1.axisFill.zIndex = -1;
        var range2 = axis.axisRanges.create();
        range2.value = 80;
        range2.endValue = 100;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = colorSet.getIndex(8);
        range2.axisFill.zIndex = -1;
        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.showValue(percentageQuotaUsed > 100 ? 100 : percentageQuotaUsed);
    }, [quota.allotment, quota.used]);
    return (React.createElement(Card, { component: Wrapper, elevation: 24 },
        React.createElement(Chart, { id: "dailyQuota" })));
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=DailyQuotaUsed.js.map