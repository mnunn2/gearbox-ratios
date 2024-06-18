"use client";
import { useState } from "react";
import { getGearData } from "@/lib/utils";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const gearData = getGearData();
type Ratios = Array<[string, number, number, number?]>;

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

  const gb = gearData.filter((g) => g.name === name)[0];
  const topDiv = gb.main4 / gb.lay4;

  const ratiosTable: Ratios = [
    ["first", gb.main1, gb.lay1, calcInt(gb.main1, gb.lay1, topDiv)],
    ["second", gb.main2, gb.lay2, calcInt(gb.main2, gb.lay2, topDiv)],
    ["third", gb.main3, gb.lay3, calcInt(gb.main3, gb.lay3, topDiv)],
    ["fourth", gb.main4, gb.lay4, calcInt(gb.main4, gb.lay4, topDiv)],
  ];

  return (
    <>
      <h2>{gb.name}</h2>
      <div>
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
      </div>
    </>
  );
}
