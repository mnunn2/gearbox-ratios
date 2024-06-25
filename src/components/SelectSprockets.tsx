import { Row, Col, Form } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { sprocOpts } from "@/lib/data";

export default function SelectSprockets({
  sprocketSelect,
  sproc,
}: {
  sprocketSelect: ChangeEventHandler;
  sproc: any;
}) {
  return (
    <>
      <Form.Group>
        <Row>
          <Col lg={3} md={6} sm={12} xs={12}>
            <Form.Label>Engine : </Form.Label>
            <Form.Select
              name="en"
              value={sproc.en}
              onChange={(e) => sprocketSelect(e)}
            >
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
            <Form.Select
              name="cl"
              value={sproc.cl}
              onChange={(e) => sprocketSelect(e)}
            >
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
            <Form.Select
              name="gb"
              value={sproc.gb}
              onChange={(e) => sprocketSelect(e)}
            >
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
            <Form.Select
              name="rw"
              value={sproc.rw}
              onChange={(e) => sprocketSelect(e)}
            >
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
    </>
  );
}
