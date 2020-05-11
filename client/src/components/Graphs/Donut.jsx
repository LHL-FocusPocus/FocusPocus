import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Wrapper = styled(Box)`
  ${'' /* border: solid 3px black; */}
  flex: 1 50%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${'' /* padding: 3em; */}

  @media (max-width: 1300px) {
    flex: 1 40%;
    ${"" /* order: -1 */}
  }
`;

const Chart = styled.div`
  align-self: center;
  width: 100%;
  height: 150%;
  transform: translateY(50px) translateX(80px)
`;

export default function Donut() {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("donutChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        website: "www.reddit.com",
        time: 50,
      },
      {
        website: "www.facebook.com",
        time: 30,
      },
      {
        website: "www.twitter.com",
        time: 20,
      },
      {
        website: "Whitelisted Sites",
        time: 100,
      }
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;
    chart.scale = 0.75;
    // chart.resize = 50

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "time";
    series.dataFields.depthValue = "time";
    series.dataFields.category = "website";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

  }, []);

  return (
    <Wrapper>
      <Chart id="donutChart"></Chart>
    </Wrapper>
  );
}
