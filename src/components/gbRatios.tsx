"use client";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
import { gearName, gearData, sprocOpts } from "@/lib/data";
import { Gears, Ratios } from "@/lib/defs";
import { calcInternalRatios, getGears } from "@/lib/utils";

// overallRatios.map((r) => console.log(parseFloat(r.toFixed(3))));

export default function GbRatios() {
  // state defs
  const [gbName, setGbName] = useState("Norton Commando");
  const [sproc, setSproc] = useState({
    en: 26,
    cl: 57,
    gb: 19,
    rw: 42,
  });

  // get individual gb object from gearData using gbName state
  const gb = gearData.filter((g) => g.name === gbName)[0];

  // form handlers
  const gbSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setGbName(e.target.value);

  const driveRatioSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSproc((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  // set gears and ratios arrays
  const gears: Gears = getGears(gb);
  const intRatios: Ratios = calcInternalRatios(gears);
  const driveRatio = (sproc.cl / sproc.en) * (sproc.rw / sproc.gb);
  const overallRatios: Ratios = intRatios.map((r) => r * driveRatio);
  return (
    <>
      <Form.Select value={gbName} onChange={gbSelect}>
        {gearData.map((g) => {
          return (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </Form.Select>
      <div>{gbName}</div>
      <div>
        {gears.map((g, i) => (
          <p key={i}>
            {`${gearName[i]}: ${g[0]} ${g[1]} ${parseFloat(intRatios[i].toFixed(3))}`}
          </p>
        ))}
      </div>
      <Form.Group>
        <Row>
          <Col lg={3} md={6} sm={12} xs={12}>
            <Form.Label>Engine : </Form.Label>
            <Form.Select name="en" value={sproc.en} onChange={driveRatioSelect}>
              {sprocOpts.en.map((g, i) => {
                return (
                  <option value={g} key={i}>
                    {g}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col lg={3} md={6} sm={12} xs={12}>
            <Form.Label>Clutch : </Form.Label>
            <Form.Select name="cl" value={sproc.cl} onChange={driveRatioSelect}>
              {sprocOpts.cl.map((g, i) => {
                return (
                  <option value={g} key={i}>
                    {g}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col lg={3} md={6} sm={12} xs={12}>
            <Form.Label>Gearbox : </Form.Label>
            <Form.Select name="gb" value={sproc.gb} onChange={driveRatioSelect}>
              {sprocOpts.gb.map((g, i) => {
                return (
                  <option value={g} key={i}>
                    {g}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col lg={3} md={6} sm={12} xs={12}>
            <Form.Label>Rear Wheel : </Form.Label>
            <Form.Select name="rw" value={sproc.rw} onChange={driveRatioSelect}>
              {sprocOpts.rw.map((g, i) => {
                return (
                  <option value={g} key={i}>
                    {g}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
      <div>
        {overallRatios.map((g, i) => (
          <p key={i}>{`${gearName[i]}: ${parseFloat(g.toFixed(3))}`}</p>
        ))}
      </div>
    </>
  );
}
