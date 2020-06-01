import React, { useEffect } from "react";
import styled from "styled-components";
import toMinutes from "../../helpers/toMinutes";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Paper, Box } from "@material-ui/core";

const Wrapper = styled(Box)`
  flex: 1;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    margin-bottom: 3em;
    flex: 1 100%;
  }
`;

const Card = styled(Paper)`
  width: 100%;
  height: 50vh;
`;

const Chart = styled.div`
  align-self: center;
  width: 85%;
  height: 85%;
`;

export default function DailyQuotaUsed({ quota }: any) {
  useEffect(() => {
    // Convert quota used/allotment to percentage
    let percentageQuotaUsed: number;
    if (quota.used) {
      percentageQuotaUsed =
        (toMinutes(quota.used) / toMinutes(quota.allotment)) * 100;
    } else {
      percentageQuotaUsed = 0;
    }

    // If user is over quota, replace "%" label with text showing much over they are
    const displayText = () => {
      if (percentageQuotaUsed > 100) {
        return `${(percentageQuotaUsed - 100).toFixed(0)}% over quota!`;
      }
      return "%";
    };

    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("dailyQuota", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0;

    chart.innerRadius = -25;

    const axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.fontSize = 27;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    axis.renderer.grid.template.strokeOpacity = 0.3;

    // Chart titles
    let title = chart.titles.create();
    title.text = "Daily Quota Used";
    title.fontSize = 40;
    title.marginBottom = 30;

    // Chart labels
    let label = chart.chartContainer.createChild(am4core.Label);
    label.text = displayText();
    label.fontSize = 35;
    label.align = "center";

    const colorSet = new am4core.ColorSet();

    const range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 60;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;

    const range1 = axis.axisRanges.create();
    range1.value = 60;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(12);
    range1.axisFill.zIndex = -1;

    const range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(8);
    range2.axisFill.zIndex = -1;

    const hand = chart.hands.push(new am4charts.ClockHand());

    hand.showValue(percentageQuotaUsed > 100 ? 100 : percentageQuotaUsed);
  }, [quota]);

  return (
    <Card component={Wrapper} elevation={24}>
      <Chart id="dailyQuota"></Chart>
    </Card>
  );
}
