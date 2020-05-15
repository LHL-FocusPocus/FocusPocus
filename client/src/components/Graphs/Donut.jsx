import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 50%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${"" /* padding: 3em; */}
  height: 400px;

  @media (max-width: 1300px) {
    flex: 1 40%;
    ${"" /* order: -1 */}
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 100%;
  height: 100%;
  transform: translateY(60px);
  padding-bottom: 18%;
`;

export default function Donut({ donutData }) {
  useEffect(() => {
    console.log('donutData', donutData)
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("donutChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;

    chart.data = donutData;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 40;
    chart.scale = 1;
    // chart.resize = 50

    let title = chart.titles.create();
    title.text = "Blocked vs. Non-Blocked Sites";
    title.fontSize = 20;
    title.marginBottom = 30;

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "time";
    series.dataFields.depthValue = "time";
    series.dataFields.category = "website";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }, [donutData]);

  return (
    <Wrapper>
      <Chart id="donutChart"></Chart>
    </Wrapper>
  );
}
