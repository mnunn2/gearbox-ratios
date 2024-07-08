import { Table, Form, Col, Row } from "react-bootstrap";
import { Ratios } from "@/lib/defs";
import { useState, ChangeEventHandler } from "react";
import GearsChart from "./GearsChart";

export default function RoadSpeeds({ oRatios }: { oRatios: Ratios }) {
  const [maxRPM, setMaxRPM] = useState(7500);
  const [gcRpm, setGcRpm] = useState(5000);
  const [wheelRad, setWheelRad] = useState(12); //inches
  const [isMph, setIsMph] = useState(true); //inches

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
  const handleGcRpm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGcRpm(parseInt(e.target.value));
  };
  const handleRwRad: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWheelRad(parseFloat(e.target.value));
  };
  const handleMphKph: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === "true") setIsMph(true);
    else setIsMph(false);
  };

  // const calcSpeed = (rpm: number, wr: number, or: number) => {
  //   // wr = wheel radius in mm, or = overall ratio
  //   const wc = 2 * Math.PI * wr; //mm per rev
  //   const kph = ((rpm / or) * wc * 60) / 1000000; //km per hour
  //   return kph * 0.6213711922; //mph
  // };
  const calcSpeed = (rpm: number, wr: number, or: number, mph: boolean) => {
    // wr = wheel radius in mm, or = overall ratio
    const wc = 2 * Math.PI * wr; //mm per rev
    const kph = ((rpm / or) * wc * 60) / 1000000; //km per hour
    if (mph) return Math.round(kph * 0.6213711922);
    return Math.round(kph);
  };

  const calcRpm = (kph: number, wr: number, or: number, mph: boolean) => {
    if (mph) kph = kph * 1.609344;
    // wr = wheel radius in mm, or = overall ratio
    const wc = 2 * Math.PI * wr; //mm per rev
    // distand traveled per engine rev in mm wc / or
    // mm traveled per minute kph * 1000000 / 60
    const rpm = (kph * 1000000) / 60 / (wc / or);
    return Math.round(rpm);
  };

  const revsArr = getRevs(1000, maxRPM, 500);
  const wr = wheelRad * 25.4; // mm

  const calcData = (
    maxRpm: number,
    gcRpm: number,
    wr: number,
    or: Ratios,
    mph: boolean,
  ) => {
    const initRpm = 2000;
    let rDat = [
      { x: calcSpeed(initRpm, wr, or[0], mph), y: initRpm },
      { x: calcSpeed(gcRpm, wr, or[0], mph), y: gcRpm },
    ];

    for (let i = 1, len = or.length; i < len; i++) {
      let rpm = gcRpm;
      if (i === len - 1) rpm = maxRpm;
      let pSpeed = rDat[rDat.length - 1].x;
      let cRpm = calcRpm(pSpeed, wr, or[i], mph);
      rDat.push({ x: pSpeed + 0.1, y: cRpm });
      rDat.push({ x: calcSpeed(rpm, wr, or[i], mph), y: rpm });
    }
    return [{ id: "rpm / road speed", color: "hsl(49, 70%, 50%)", data: rDat }];
  };

  const chartData = calcData(maxRPM, gcRpm, wr, oRatios, isMph);

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>
              Rear wheel rolling radius <b>{wheelRad} &#34;</b>
            </Form.Label>
            <Form.Range
              min="10"
              max="14"
              step="0.5"
              onChange={(e) => handleRwRad(e)}
            />
          </Col>
          <Col>
            <Form.Label>
              Max RPM <b>{maxRPM}</b>
            </Form.Label>
            <Form.Range
              min="5000"
              max="10000"
              step="500"
              onChange={(e) => handleMaxRPM(e)}
            />
          </Col>
          <Col>
            <Form.Label>
              Gear change RPM <b>{gcRpm}</b>
            </Form.Label>
            <Form.Range
              min="3000"
              max={maxRPM}
              step="500"
              onChange={(e) => handleGcRpm(e)}
            />
          </Col>
          <Col>
            <Form.Check
              label="MPH"
              value="true"
              name="group1"
              type="radio"
              id="inline-radio-1"
              checked={isMph === true}
              onChange={handleMphKph}
            />
            <Form.Check
              label="KPH"
              value="false"
              name="group1"
              type="radio"
              id="inline-radio-2"
              checked={isMph === false}
              onChange={handleMphKph}
            />
          </Col>
        </Row>
      </Form>
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
                  return <td key={i}>{calcSpeed(r, wr, or, isMph)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <GearsChart data={chartData} />
    </>
  );
}
