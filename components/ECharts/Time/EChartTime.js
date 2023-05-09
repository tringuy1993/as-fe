import React, { useState, useEffect } from "react";
import {
  combineESOptionData,
  GetAllGEXDataCallBack,
} from "../../services/GetData.service";
import { format } from "date-fns";
import { ECOpts_Time } from "./EChartTime_Opts";
import ReactEcharts from "echarts-for-react";
import { ALL_URL, ES_URL } from "../../constants";
import { useAxiosPrivate } from "../../hooks";

const EChartTime = ({ symbol, data, greek, theme }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartHeight, setChartHeight] = useState({});

  // let option, chartHeight, data;
  if (data){
    if (symbol === "ES"){

    }else{
      
    }
  }
  const fetchTimeGEX = async () => {
    setChartHeight([]);
    setChartOptions([]);
    try {
      // let option, chartHeight, data;
      if (symbol === "ES") {
        const response = await axiosPrivate(ES_URL, { params });
        data = combineESOptionData(response?.data, greek);
        console.log(symbol, data);
      } else {
        const response = await axiosPrivate(ALL_URL, { params });
        data = response.data.map((data) => GetAllGEXDataCallBack(data, greek));
        // console.log(data);
        console.log(symbol, data);
      }
      ({ option, chartHeight } = ECOpts_Time(data));
      setChartOptions(option);
      setChartHeight(chartHeight);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTimeGEX();
    // eslint-disable-next-line
  }, [startDate, endDate, greek, symbol]);

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
