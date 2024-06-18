"use client";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import GbSelector from "./gbSelector";

type Ratios = Array<[string, number, number?]>;
const enSp: number = 19,
  clSp: number = 43,
  gbSp: number = 19,
  rwSp: number = 42;
// const calcInt = (main: number, lay: number): number => {
//     return (parseFloat(((lay / main) * topDiv).toFixed(3)))
// }
const calcOverall = (int: number): number => {
  return parseFloat(((clSp / enSp) * (rwSp / gbSp) * int).toFixed(3));
};

// const topDiv = gbData.main4 / gbData.lay4;
// const ratiosTable: Ratios = [
//     ["first", calcInt(gbData.main1, gbData.lay1)],
//     ["second", calcInt(gbData.main2, gbData.lay2)],
//     ["third", calcInt(gbData.main3, gbData.lay3)],
//     ["fourth", calcInt(gbData.main4, gbData.lay4)]
// ]
// ratiosTable.forEach((item) => item.push(calcOverall(item[1])));

// copy the bits I need from the original file
export default function GbRatios() {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
  };

  const [gbName, setGbName] = useState("default");

  return (
    <>
      <GbSelector />
    </>
  );
}
