import React, { useState, useEffect } from "react";

import { ECOpts_Time, EChartTime_Opts } from "./EChartTime_Opts";
import ReactEcharts from "echarts-for-react";
import { GetAllModifiedToSData, GetModifiedToSData, combineESOptionData } from "../DataEChart";
import { modify_data } from "../UtilECharts";

const EChartTime = ({ symbol, data, greek, theme }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartHeight, setChartHeight] = useState({});


  function getData (){
    setChartHeight([]);
    setChartOptions([]);
    let option, chartHeight
    if (data){
      ({option, chartHeight}= EChartTime_Opts(data));
      setChartOptions(option)
      setChartHeight(chartHeight);
    }
    // ({option, chartHeight}= EChartTime_Opts(data));

  }

  useEffect(() => {
    getData()
  }, [data, greek, symbol]);

  return (
    <>
      {Object.keys(chartOptions).length && (
        <ReactEcharts
          option={{ ...chartOptions }}
          style={{ height: chartHeight }}
          theme={theme}
        ></ReactEcharts>
      )}
    </>
  );
};

export default EChartTime;
