"use client";
import { ChangeEvent, useReducer } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
// data and utils
import { gearData } from "@/lib/data";
import { Sprocs, Ratios } from "@/lib/defs";
import { calcInternalRatiosGb, getGears } from "@/lib/utils";
// components
import GearsTable from "./GearsTable";
import SelectGearbox from "./SelectGearbox";
import SelectNumGears from "./SelectNumGears";
import SetIntRatiosForm from "./SetIntRatiosForm";
import SelectSprockets from "./SelectSprockets";
import OverallRatiosTable from "./ OverallRatiosTable";
import GearSpacing from "./GearSpacing";

// reducer action types
type SetGb = { type: "setGb"; gbName: string };
type SetIntForm = { type: "setIntForm"; intRatios: Ratios };
type setGearNum = { type: "setGearNum"; manGearNum: number };
type setSprocs = { type: "setSprocs"; sprocs: Sprocs };
type Action = SetGb | setGearNum | setSprocs | SetIntForm;

export default function GbRatios() {
  const [state, dispatch] = useReducer(reducer, initState);

  // reducer actions / form handlers
  function handleSetGb(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "setGb",
      gbName: e.target.value,
    });
  }

  function handleSetGearNum(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "setGearNum",
      manGearNum: parseInt(e.target.value),
    });
  }

  function handleSetSprocs(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "setSprocs",
      sprocs: {
        ...state.sprocs,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  }

  function handleSetIntForm(r: Ratios) {
    dispatch({
      type: "setIntForm",
      intRatios: r,
    });
  }

  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <SelectGearbox gbSelect={handleSetGb} gbName={state.gbName} />
          {state.showGears && (
            <GearsTable gears={state.gears} intRatios={state.intRatios} />
          )}
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <SelectNumGears
            gearNumSelect={handleSetGearNum}
            manGearNum={state.manGearNum}
          />
          {state.showManIntIn && (
            <SetIntRatiosForm
              manGearNum={state.manGearNum}
              setIntRatiosForm={handleSetIntForm}
            />
          )}
        </Col>
      </Row>
      <div>{state.gbName}</div>
      <SelectSprockets sprocketSelect={handleSetSprocs} sproc={state.sprocs} />
      <div></div>
      {state.showOverall && (
        <OverallRatiosTable overallRatios={state.overallRatios} />
      )}

      <GearSpacing
        intRatios={state.intRatios}
        overallRatios={state.overallRatios}
      />
    </>
  );
}

function reducer(state: typeof initState, n: Action): typeof initState {
  switch (n.type) {
    case "setGb": {
      const gb = gearData.filter((g) => g.name === n.gbName)[0];
      const tmpGears = getGears(gb);
      const intTmp = calcInternalRatiosGb(tmpGears);
      const driveTmp = (gb.cl / gb.en) * (gb.rw / gb.gb);
      const overallTmp = intTmp.map((r) => r * driveTmp);

      return {
        ...state,
        gbName: n.gbName,
        gears: tmpGears,
        intRatios: intTmp,
        overallRatios: overallTmp,
        sprocs: {
          en: gb.en,
          cl: gb.cl,
          gb: gb.gb,
          rw: gb.rw,
        },
        showGears: true,
        showOverall: true,
        showManIntIn: false,
        manGearNum: 1,
      };
    }
    case "setGearNum": {
      return {
        ...state,
        manGearNum: n.manGearNum,
        showManIntIn: true,
        showGears: false,
        showOverall: false,
        gbName: "default",
        sprocs: initState.sprocs,
      };
    }
    case "setSprocs": {
      const dr = (n.sprocs.cl / n.sprocs.en) * (n.sprocs.rw / n.sprocs.gb);
      const or = state.intRatios.map((r) => r * dr);

      return {
        ...state,
        sprocs: n.sprocs,
        driveRatio: dr,
        overallRatios: or,
      };
    }
    case "setIntForm": {
      const overallTmp = n.intRatios.map((r) => r * state.driveRatio);
      return {
        ...state,
        intRatios: n.intRatios,
        overallRatios: overallTmp,
        showOverall: true,
      };
    }
  }
}
const initState = {
  gbName: "",
  gears: [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  intRatios: [0, 0, 0, 0],
  overallRatios: [0, 0, 0, 0],
  driveRatio: 5.94,
  sprocs: { en: 16, cl: 43, gb: 19, rw: 42 },
  showGears: false,
  showManIntIn: false,
  manGearNum: 1,
  showOverall: false,
};
