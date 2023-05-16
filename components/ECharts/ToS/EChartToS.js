import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { EChartToS_Opts } from "./EChartToS_Opts";
import { Grid } from "@mantine/core";
import { EChart_Opts_VolOI } from "../EChart_Opts_VolOI";
// import { GetModifiedToSData } from "../DataEChart";
import { modify_data } from "../UtilECharts";

// function modify_data(data, greek) {
//   const modified_data = data?.map((data)=> GetModifiedToSData(data, greek))
//         // Need index in data
//   for (let i = 0; i < modified_data.length; i++) {
//           modified_data[i].index = i;
//         }

//   const nonzero_data = modified_data?.filter(function (obj) {
//     return obj.c_notion_expo !== 0 && obj.p_notion_expo !== 0;
//   });

//   return {modified_data: modified_data, nonzero_data: nonzero_data}
// }

export default function EChartToS({ symbol, data, theoData, greek, theme }) {
  let ecOptions, ecVoloptions;
  if (data) {
    const { modified_data, nonzero_data } = modify_data(data, greek);
    if (theoData) {
      for (let i = 0; i < theoData.length; i++) {
        theoData[i].index = i;
      }
    }
    ecOptions = EChartToS_Opts(symbol, nonzero_data, theoData, greek, theme);
    ecVoloptions = EChart_Opts_VolOI(symbol, modified_data);
  }

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        <ReactEcharts
          option={{ ...ecOptions }}
          style={{ height: "650px" }}
          theme={theme}
        />
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <ReactEcharts
          option={{ ...ecVoloptions }}
          style={{ height: "650px" }}
          theme={theme}
        />
      </Grid.Col>
    </Grid>
  );

  // if (Object.keys(chartData).length) {
  //   const test = ECOpts_GEX(symbol, chartData, theoData);
  //   return (
  //     <Grid>
  //       <Grid.Col sm={12} md={6}>
  //         <ReactEcharts
  //           option={{ ...test }}
  //           style={{ height: "650px" }}
  //           theme={theme}
  //         />
  //       </Grid.Col>
  //       <Grid.Col sm={12} md={6}>
  //         {Object.keys(volOptions).length && (
  //           <ReactEcharts
  //             option={{ ...volOptions }}
  //             theme={theme}
  //             style={{ height: "650px" }}
  //           />
  //         )}
  //       </Grid.Col>
  //     </Grid>
  //   );
  // } else {
  //   return <></>;
  // }
}
