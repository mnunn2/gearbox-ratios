"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getGearData } from "@/lib/utils";
import Form from "react-bootstrap/Form";
import IntRatiosTable from "./intRatiosTable";

const gearData = getGearData();
type Ratios = Array<[string, number, number, number, number?]>;

const calcInt = (main: number, lay: number, topDiv: number): number => {
  return parseFloat(((lay / main) * topDiv).toFixed(3));
};

export default function GbSelector({
  setIntRatios,
}: {
  setIntRatios: Function;
}) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
  };
  // update intRatios state in parent to inital state (default)
  // useEffect(() => {
  //   setIntRatios([1, 0, 0, 0]);
  // }, []);

  const [gbName, setGbName] = useState("default");
  // gb individual gb object
  const gb = gearData.filter((g) => g.name === gbName)[0];

  return (
    <>
      <Form.Select value={gbName} onChange={handleSelectChange}>
        {gearData.map((g) => {
          return (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </Form.Select>
      <div>
        <IntRatiosTable gb={gb} setIntRatios={setIntRatios} />
      </div>
    </>
  );
}
