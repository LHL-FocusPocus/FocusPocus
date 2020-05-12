import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 50%;
  display: flex;
  items-align: center;
  justify-content: center;

  @media (max-width: 1300px) {
    order: 2;
    flex: 1 100%;
  }
`;

const Chart = styled.div`
  align-self: center;
  height: 100%;
  width: 100%;
`;

export default function Radial() {
  useEffect(() => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("radial-chart", am4charts.RadarChart);

    // Just the blacklisted sites
    // Preferably how many times you went to the site
    // Over a week period makes more sense (not much data over a day period)

    const userData = {
      quota: 50,
      donut: [
        {
          website: "Reddit",
          time: 50,
        },
        {
          website: "Facebook",
          time: 30,
        },
      ],
      leaderboard: [
        {
          name: "Monica",
          browsingTime: 3,
          href:
            "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
        },
        {
          name: "Joey",
          browsingTime: 10,
          href: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg",
        },
      ],
      shameboard: [
        {
          name: "Monica",
          steps: 140,
          href:
            "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
        },
        {
          name: "Joey",
          steps: 200,
          href: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg",
        },
      ],
      lineGraph: [
        {
          date: "2020-04-26",
          time: 8,
        },
        {
          date: "2020-04-27",
          time: 10,
        },
      ],
      radial: [
        {
          website: "Reddit",
          visits: 15,
        },
        {
          website: "Facebook",
          visits: 12,
        },
      ],
    };
    chart.data = [
      {
        website: "Reddit",
        visits: 15,
      },
      {
        website: "Facebook",
        visits: 12,
      },
      {
        website: "Twitter",
        visits: 2,
      },
      {
        website: "ESPN",
        visits: 7,
      },
      {
        website: "CNN",
        visits: 9,
      },
      {
        website: "Tumblr",
        visits: 1,
      },
      {
        website: "Instagram",
        visits: 4,
      },
    ];

    chart.innerRadius = am4core.percent(30);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "website";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;

    chart.seriesContainer.zIndex = -10;

    const series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = "website";
    series.dataFields.valueY = "visits";
    series.tooltipText = "Hits: {valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.radarColumn.cornerRadius = 5;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.behavior = "none";
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;
  }, []);

  return (
    <Wrapper>
      <Chart id="radial-chart"></Chart>
    </Wrapper>
  );
}
