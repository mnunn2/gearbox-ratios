"use client";
import { Form } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { numOfGears } from "@/lib/data";

export default function SelectNumGears({
  gearNumSelect,
  manGearNum,
}: {
  gearNumSelect: ChangeEventHandler;
  manGearNum: number;
}) {
  return (
    <>
      <Form.Label>Select number of gears : </Form.Label>
      <Form.Select
        className="mb-3"
        value={manGearNum}
        onChange={(e) => gearNumSelect(e)}
      >
        {numOfGears.map((n, i) => {
          return (
            <option value={n} key={i}>
              {n}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
}
