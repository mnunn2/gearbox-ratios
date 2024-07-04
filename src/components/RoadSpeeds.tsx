import { Table, Form, Col, Row } from "react-bootstrap";
import { Ratios } from "@/lib/defs";
import { useState, ChangeEventHandler } from "react";

export default function RoadSpeeds({ oRatios }: { oRatios: Ratios }) {
  const [maxRPM, setMaxRPM] = useState(7500);
  const [wheelRad, setWheelRad] = useState(12); //inches

  const getRevs = (start: number, end: number, step: number) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  };

  const handleMaxRPM: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMaxRPM(parseInt(e.target.value));
  };
  const handleRwRad: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWheelRad(parseFloat(e.target.value));
  };

  const calcSpeed = (rpm: number, wr: number, or: number) => {
    // wr = wheel radius in mm, or = overall ratio
    const wc = 2 * Math.PI * wr; //mm per rev
    const kph = ((rpm / or) * wc * 60) / 1000000; //km per hour
    return kph * 0.6213711922; //mph
  };

  const revsArr = getRevs(1000, maxRPM, 500);
  const wr = wheelRad * 25.4; // mm

  return (
    <>
      <Col md={6}>
        <Row>
          <Form.Label>
            Rear wheel rolling radius <b>{wheelRad}</b>
          </Form.Label>
          <Form.Range
            min="10"
            max="14"
            step="0.5"
            onChange={(e) => handleRwRad(e)}
          />
          <Form.Label>
            Max RPM <b>{maxRPM}</b>
          </Form.Label>
          <Form.Range
            min="5000"
            max="10000"
            step="500"
            onChange={(e) => handleMaxRPM(e)}
          />
        </Row>
      </Col>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Gear</th>
            {revsArr.map((r, i) => {
              return <th key={i}>{r}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {oRatios.map((or, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                {revsArr.map((r, i) => {
                  return <td key={i}>{Math.round(calcSpeed(r, wr, or))}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
