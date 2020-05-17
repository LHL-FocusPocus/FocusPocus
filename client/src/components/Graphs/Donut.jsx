import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Paper from '@material-ui/core/Paper';


const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 45%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${"" /* padding: 3em; */}
  height: 400px;
  padding-bottom: 6em;
  padding-top: 2em;
  margin-right: 1.5em;  
  
  &:before {
    ${'' /* content: "";
    position: absolute;
    height: 470px;
    width: 750px;
    border: 1px solid green;
    border-radius: 1em; */}

  @media (max-width: 1300px) {
    flex: 1 40%;
    ${"" /* order: -1 */}
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 90%;
  height: 90%;
  ${'' /* transform: translateY(60px); */}
  ${'' /* padding-bottom: 5%; */}

  
`;

const Card = styled(Paper)`
  width: 200px;
  height: 400px;
`

export default function Donut({ donutData }) {
  useEffect(() => {
    console.log('donutData', donutData)
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("donutChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;

    chart.data = donutData;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 40;
    chart.scale = 1.1;
    chart.paddingRight = 60;
    chart.paddingTop = 15;

    let subtitle = chart.titles.create();
    subtitle.text = "Blocked vs. Non-Blocked Sites";
    subtitle.fontSize = 12;
    subtitle.marginBottom = 20;

    let title = chart.titles.create();
    title.text = "Today's Browsing";
    title.fontSize = 25;
    title.marginBottom = 10;


    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "time";
    series.dataFields.depthValue = "time";
    series.dataFields.category = "website";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }, [donutData]);

  return (
    <Card elevation={24} component={Wrapper}>
      <Chart id="donutChart"></Chart>
    </Card>
  );
}
