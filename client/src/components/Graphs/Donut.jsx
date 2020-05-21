import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Paper, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
const Wrapper = styled(Box)`
  flex: 1 45%;
  display: flex;
  items-align: center;
  justify-content: center;
  height: 400px;
  padding-bottom: 6em;
  padding-top: 2em;
  margin-right: 1.5em;

  @media (max-width: 1300px) {
    flex: 1 40%;
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 90%;
  height: 90%;
`;

const Card = styled(Paper)`
  width: 200px;
  height: 400px;
`;

export default function Donut({ donutData }) {
  // const [error, setError] = useState(false);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("donutChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;

    chart.data = donutData;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 40;
    chart.scale = 1.1;
    chart.paddingRight = 60;
    chart.paddingTop = 15;
    chart.numberFormatter.numberFormat = "#.  mins";

    let subtitle = chart.titles.create();
    subtitle.text = "Blocked vs. Non-Blocked Sites";
    subtitle.fontSize = 17;
    subtitle.marginBottom = 30;
    subtitle.fontFamily = "Raleway, sans-serif";

    let title = chart.titles.create();
    title.text = "Today's Browsing";
    title.fontSize = 40;

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "time";
    series.dataFields.depthValue = "time";
    series.dataFields.category = "website";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
    series.fontSize = 25;
    series.tooltip.fontSize = 30;
  }, [donutData]);

  // console.log('donutData :>> ', donutData);

  // const checkData = () => {
  //   if (donutData.length === 0) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //   }
  //   console.log("hi")
  // };
  // // checkData();

  return (
    // donutData.length !== 0 ?  (
    <Card elevation={24} component={Wrapper}>
      <Chart id="donutChart"></Chart>
    </Card>
    // ) : (
    //   <Alert severity="error">
    //     You do not have any site visits recorded. Please browse with the
    //     extension.
    //   </Alert>
    // );
  );
}
