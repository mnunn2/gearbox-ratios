"use client";
import { Form } from "react-bootstrap";
import { gearData } from "@/lib/data";
import { ChangeEventHandler } from "react";

export default function SelectGearbox({
  gbSelect,
  gbName,
}: {
  gbSelect: ChangeEventHandler;
  gbName: string;
}) {
  return (
    <>
      <Form.Label>Select a Gearbox : </Form.Label>
      <Form.Select
        className="mb-3"
        value={gbName}
        onChange={(e) => gbSelect(e)}
      >
        {gearData.map((g) => {
          return (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
}
