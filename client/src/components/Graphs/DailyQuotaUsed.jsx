import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Wrapper = styled(Box)`
  ${'' /* border: solid 3px black; */}
  flex: 1 25%;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    flex: 1 100%;
    order: -1;
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 80%;
  height: 80%;
`;

export default function DailyQuotaUsed() {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("dailyQuota", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0;

    chart.innerRadius = -25;

    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    axis.renderer.grid.template.strokeOpacity = 0.3;

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

    // Percentage of quota used, eg. 1 hour / 2 hours = 50%
    const wholeData = {
      quotaToday: 50,
      // user: { firstName, lastName },
      
    }

    // Replace with real data
    hand.showValue(wholeData.quotaToday);

  }, []);

  // donut graph - todays browsing - how much time spent in differet
  // total time spent browsing all sites
  // each slice is one site

  // radial -> hits per blocked site

  // line -> 7 days, total time spent browsing bad sites
  // go through values, see what highest is -> make that max in y axis

  return (
    <Wrapper>
      <Chart id="dailyQuota">
      </Chart>
    </Wrapper>
  );
}
