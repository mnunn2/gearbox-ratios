"use client";
import { Form } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { GearData } from "@/lib/defs";

export default function SelectGearbox({
  gbSelect,
  gbName,
  gearData,
}: {
  gbSelect: ChangeEventHandler;
  gbName: string;
  gearData: GearData;
}) {
  return (
    <>
      <Form.Label>Select a Gearbox : </Form.Label>
      <Form.Select
        className="mb-3"
        value={gbName || ""}
        onChange={(e) => gbSelect(e)}
      >
        {gearData.map((g) => {
          return (
            <option value={g.name as string} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
}
