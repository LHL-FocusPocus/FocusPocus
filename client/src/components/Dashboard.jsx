import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Graph2 from "./Graphs/Graph2";
import Graph3 from "./Graphs/Graph3";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4editor from '@amcharts/editor4';

// const launcher = new am4editor.EditorLauncher();

// launcher.addEventListener('save', this.renderChart);
// launcher.addEventListener('close', () => {
//     if (launcher) {
//          launcher.close();
//     }
// });

// launcher.launch();


am4core.useTheme(am4themes_animated);

const Container = styled(Box)`
  ${"" /* display: flex; */}
  ${'' /* flex-flow: row-wrap; */}
  ${"" /* padding: 3em; */}
  padding: 3em;
  ${'' /* border: 3px solid green; */}
  height: 85.4vh;
`;

const Background = styled.div`
  background-image: none;
`;

export default function Dashboard() {
  return (
    <Background>
      <Navbar />
      <Container bgcolor="background.paper" flexWrap="wrap" display="flex">
        <DailyQuotaUsed />
        <LineGraph />
        <Donut />
        <Graph2 />
        <Graph3 />
      </Container>
    </Background>
  );
}
