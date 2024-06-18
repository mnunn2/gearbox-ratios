"use client";
import { useState } from "react";
import { getGearData } from "@/lib/utils";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const gearData = getGearData();
const engineSp: number = 19, clutchSp: number = 43, gbSp: number = 19, rwSp: number = 42;

export default function InternalRatio() {
  const handleGbSelection = (name: string) => {
    setGbName(name);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
  };

  const [gbName, setGbName] = useState("default");

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Select Gearbox Ratios">
        {gearData.map((g) => {
          return (
            <Dropdown.Item onClick={() => handleGbSelection(g.name)} key={g.id}>
              {g.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
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
        <Ratio name={gbName} />
      </div>
    </>
  );
}

function Ratio({ name }: { name: string }) {
  const gb = gearData.filter((g) => g.name === name)[0];
  const topDiv = gb.main4 / gb.lay4;
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
              <th>Overall Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First</td>
              <td>{gb.main1}</td>
              <td>{gb.lay1}</td>
              <td>{calcIntRatio(gb.main1, gb.lay1, topDiv)}</td>
            </tr>
            <tr>
              <td>Second</td>
              <td>{gb.main2}</td>
              <td>{gb.lay2}</td>
              <td>{calcIntRatio(gb.main2, gb.lay2, topDiv)}</td>
            </tr>
            <tr>
              <td>Third</td>
              <td>{gb.main3}</td>
              <td>{gb.lay3}</td>
              <td>{calcIntRatio(gb.main3, gb.lay3, topDiv)}</td>
            </tr>
            <tr>
              <td>Fourth</td>
              <td>{gb.main4}</td>
              <td>{gb.lay4}</td>
              <td>{calcIntRatio(gb.main4, gb.lay4, topDiv)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

function calcOverallRatio(gb: any) {
}

function calcIntRatio(main: number, lay: number, topDiv: number) {
  return ((lay / main) * topDiv).toFixed(3);
}
