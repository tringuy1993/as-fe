'use client'
import { useState } from "react";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { DatePicker, SelectGreek, SelectTicker } from "@/components";
import { ALL_URL, ES_URL, GREEK_EXPO_URL } from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";

export default function TimeGamma() {
  //Select Date
  const [selectedDateRange] = useState([new Date(), getNextFriday2()]);
  const [finalDate, setFinalDate] = useState(selectedDateRange);
  const handleSubmit = (selectedDateRange) => {
    setFinalDate(() => selectedDateRange.dateRange);
  };
  //Select Greek
  const [selectedGreek, setSelectedGreek] = useState("gamma");
  function handleGreekChange(event) {
    setSelectedGreek(event);
  }

  //Select Ticker
  const [selectTicker, setSelectTicker] = useState("$SPX.X");
  function handleTickerChange(event) {
    setSelectTicker(event);
  }

  const update_param = [finalDate, selectedGreek, selectTicker]
  //Request Parameters
  //Request ES Data
  const updateInterval = 0
  const params = req_params(selectTicker, selectedGreek, finalDate)
  const key_params = {"ES": ES_URL, "$SPX.X": GREEK_EXPO_URL, "SPY": GREEK_EXPO_URL}
  const { data } = useFetch(params, `${key_params[selectTicker]}`, update_param, updateInterval)
  console.log(data)
  return (
      <main className="">
        <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
        <SelectGreek value={selectedGreek} onChange={handleGreekChange}/>
        <SelectTicker value={selectTicker} onChange={handleTickerChange} />
      </main>
    )
  }