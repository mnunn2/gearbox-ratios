"use client";
import { useState } from "react";
import { getGearData } from "@/lib/utils";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const gearData = getGearData();
type Ratios = Array<[string, number, number, number, number?]>;

const calcInt = (main: number, lay: number, topDiv: number): number => {
  return parseFloat(((lay / main) * topDiv).toFixed(3));
};

export default function GbSelector() {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
  };

  const [gbName, setGbName] = useState("default");

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
        <IntRatioTable name={gbName} />
      </div>
    </>
  );
}

function IntRatioTable({ name }: { name: string }) {
  // build the ratio table and calc internal ratios
  const gb = gearData.filter((g) => g.name === name)[0];
  let topDiv: number = 0;
  const tmpTable: Ratios = [];
  // if there is a fifth gear
  if (gb.main5 && gb.lay5) {
    topDiv = gb.main5 / gb.lay5;
    tmpTable.push([
      "fourth",
      gb.main4,
      gb.lay4,
      calcInt(gb.main4, gb.lay4, topDiv),
    ]);
    tmpTable.push([
      "top",
      gb.main5,
      gb.lay5,
      calcInt(gb.main5, gb.lay5, topDiv),
    ]);
  } else {
    topDiv = gb.main4 / gb.lay4;
    tmpTable.push([
      "top",
      gb.main4,
      gb.lay4,
      calcInt(gb.main4, gb.lay4, topDiv),
    ]);
  }

  const ratiosTable: Ratios = [
    ["first", gb.main1, gb.lay1, calcInt(gb.main1, gb.lay1, topDiv)],
    ["second", gb.main2, gb.lay2, calcInt(gb.main2, gb.lay2, topDiv)],
    ["third", gb.main3, gb.lay3, calcInt(gb.main3, gb.lay3, topDiv)],
  ];

  ratiosTable.push(...tmpTable);

  // get the internal ratios column and calculate the gear spacing
  let gearSpacing = "first - ";
  let intRats = ratiosTable.map((v) => v[3]);
  const overallSpacing = (intRats[0] - 1).toFixed(2);
  // subtract each internal ratio from the previous one
  let spaces = intRats.map((e, i) => {
    return e - intRats[i + 1];
  });

  spaces.map((e, i) => {
    if (i === 0 && !isNaN(e))
      gearSpacing = gearSpacing + e.toFixed(1) + " - second - ";
    if (i === 1 && !isNaN(e))
      gearSpacing = gearSpacing + e.toFixed(1) + " - third - ";
    if (i === 2 && !isNaN(e))
      gearSpacing = gearSpacing + e.toFixed(1) + " - fourth";
    if (i === 3 && !isNaN(e))
      gearSpacing = gearSpacing + " - " + e.toFixed(1) + " - fifth";
  });

  return (
    <>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Gear</th>
            <th>Mainshaft</th>
            <th>Layshaft</th>
            <th>Internal Ratio</th>
          </tr>
        </thead>
        <tbody>
          {ratiosTable.map((g, i) => {
            return (
              <tr key={i}>
                <td>{g[0]}</td>
                <td>{g[1]}</td>
                <td>{g[2]}</td>
                <td>{g[3]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>{gearSpacing}</p>
      <p>overall spacing: first - {overallSpacing} -  top</p>
    </>
  );
}
