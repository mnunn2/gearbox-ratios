"use client";
import { useState, ChangeEvent } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
// data and utils
import { gearData, sprocOpts } from "@/lib/data";
import { Gears, Ratios } from "@/lib/defs";
import { calcInternalRatiosGb, getGears } from "@/lib/utils";
// components
import GearsTable from "./GearsTable";
import SelectGearbox from "./SelectGearbox";
import SelectNumGears from "./SelectNumGears";
import InternalRatiosForm from "./InternalRatiosForm";
import SelectSprockets from "./SelectSprockets";
import OverallRatiosTable from "./ OverallRatiosTable";

export default function GbRatios() {
  // state defs
  const [manGearNum, setManGearNum] = useState(4);
  const [showGears, setShowGears] = useState(false);
  const [showManIntIn, setShowManIntIn] = useState(false);
  const [gbName, setGbName] = useState("Norton Commando");
  const [sproc, setSproc] = useState({
    en: 26,
    cl: 57,
    gb: 19,
    rw: 42,
  });

  // get individual gb object from gearData using gbName state
  // get the gears from gb and calc internal ratios
  const gb = gearData.filter((g) => g.name === gbName)[0];
  const gears: Gears = getGears(gb);
  const intRatios: Ratios = calcInternalRatiosGb(gears);

  // calculate overall
  const driveRatio = (sproc.cl / sproc.en) * (sproc.rw / sproc.gb);
  const overallRatios: Ratios = intRatios.map((r) => r * driveRatio);

  // form handlers
  const gbSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
    setShowGears(true);
    setShowManIntIn(false);
  };

  const gearNumSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setManGearNum(parseInt(e.target.value));
    setShowManIntIn(true);
    setShowGears(false);
  };

  const sprocketSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSproc((prevalue) => {
      return {
        // copy previous state and overwrite the whole object with new value
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <Form.Group>
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
            {showManIntIn && <InternalRatiosForm manGearNum={manGearNum} />}
          </Col>
        </Row>
      </Form.Group>
      <div>{gbName}</div>
      <SelectSprockets sprocketSelect={sprocketSelect} sproc={sproc} />
      <div></div>
      <OverallRatiosTable overallRatios={overallRatios} />
    </>
  );
}
