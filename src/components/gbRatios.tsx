"use client";
import { useState, ChangeEvent } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
// data and utils
import { gearData, sprocOpts } from "@/lib/data";
import { Gears, Ratios, Sproc } from "@/lib/defs";
import { calcInternalRatiosGb, getGears } from "@/lib/utils";
// components
import GearsTable from "./GearsTable";
import SelectGearbox from "./SelectGearbox";
import SelectNumGears from "./SelectNumGears";
import InternalRatiosForm from "./InternalRatiosForm";
import SelectSprockets from "./SelectSprockets";
import OverallRatiosTable from "./ OverallRatiosTable";
import TestForm from "./TestForm";

export default function GbRatios() {
  // state defs
  const [manGearNum, setManGearNum] = useState(1);
  const [showGears, setShowGears] = useState(false);
  const [showManIntIn, setShowManIntIn] = useState(false);
  const [gbName, setGbName] = useState("Norton Commando");
  const [sproc, setSproc] = useState<Sproc>({
    en: 26,
    cl: 57,
    gb: 19,
    rw: 42,
  });
  const [intRatios, setIntRatios] = useState([1, 2, 3, 4]);
  const [overallRatios, setOverallRatios] = useState([1, 2, 3, 4]);
  const [gears, setGears] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  // form handlers
  const gbSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const tmpGbName = e.target.value;
    setGbName(tmpGbName);
    setShowGears(true);
    setShowManIntIn(false);
    setManGearNum(1);
    // get individual gb object from gearData using tmpGbName
    // get the gears from gb and calc internal ratios
    const gb = gearData.filter((g) => g.name === tmpGbName)[0];
    const tmpGears = getGears(gb);
    let tmpSproc: Sproc = sproc;
    tmpSproc.en = gb.en;
    tmpSproc.cl = gb.cl;
    tmpSproc.gb = gb.gb;
    tmpSproc.rw = gb.rw;
    const intTmp: Ratios = calcInternalRatiosGb(tmpGears);
    const driveRatio = (sproc.cl / sproc.en) * (sproc.rw / sproc.gb);
    const overallTmp: Ratios = intTmp.map((r) => r * driveRatio);
    setGears(tmpGears);
    setIntRatios(intTmp);
    setOverallRatios(overallTmp);
    setSproc(tmpSproc);
  };

  const gearNumSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setManGearNum(parseInt(e.target.value));
    setShowManIntIn(true);
    setShowGears(false);
  };

  const sprocketSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    let tmpSproc = sproc;
    tmpSproc[e.target.name] = parseInt(e.target.value);
    setSproc(tmpSproc);
    const driveRatio = (sproc.cl / sproc.en) * (sproc.rw / sproc.gb);
    const overallTmp: Ratios = intRatios.map((r) => r * driveRatio);
    setOverallRatios(overallTmp);
  };

  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <SelectGearbox gbSelect={gbSelect} gbName={gbName} />
          {showGears && <GearsTable gears={gears} intRatios={intRatios} />}
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <SelectNumGears
            gearNumSelect={gearNumSelect}
            manGearNum={manGearNum}
          />
          {/* {showManIntIn && <InternalRatiosForm manGearNum={manGearNum} />} */}
          {showManIntIn && <TestForm manGearNum={manGearNum} />}
        </Col>
      </Row>
      <div>{gbName}</div>
      <SelectSprockets sprocketSelect={sprocketSelect} sproc={sproc} />
      <div></div>
      <OverallRatiosTable overallRatios={overallRatios} />
    </>
  );
}
