'use client';
import { useState } from "react";

type Ratios = Array<[string, number, number?]>;
const enSp: number = 19,
  clSp: number = 43,
  gbSp: number = 19,
  rwSp: number = 42;

const calcOverall = (int: number): number => {
  return parseFloat(((clSp / enSp) * (rwSp / gbSp) * int).toFixed(3));
};

export default function GearingSelector( { intRatios }: { intRatios: number[] }) {
  return (
    <>
      {intRatios.map((r, i) => {
        return(<p key={i}>{r}</p>)
        
      })}
    </>
  );
}