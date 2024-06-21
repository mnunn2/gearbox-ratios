"use client";
import { useState } from "react";
import GbSelector from "./gbSelector";
import GearingSelector from "./gearingSelector";

const enSp: number = 19,
  clSp: number = 43,
  gbSp: number = 19,
  rwSp: number = 42;

const calcOverall = (int: number): number => {
  return parseFloat(((clSp / enSp) * (rwSp / gbSp) * int).toFixed(3));
};

export default function GbRatios() {
  const [intRatios, setIntRatios] = useState([2.5, 1.5, 1.2, 1]);
  return (
    <>
      <GbSelector setIntRatios={setIntRatios} />
      <GearingSelector intRatios={intRatios} />
    </>
  );
}
