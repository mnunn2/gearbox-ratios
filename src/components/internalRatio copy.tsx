"use client";
import { useState } from "react";
import { getGearData } from "@/lib/utils";
const gearData = getGearData();

export default function InternalRatio() {
  const handleGbSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGbName(e.target.value);
  };
  let [gbName, setGbName] = useState("");
  return (
    <>
      <h1 className="header">
        <p>Bollox</p>
      </h1>
      <select onChange={handleGbSelection}>
        {/*<option value=""> -- Select a Gear Box -- </option>*/}
        {gearData.map((g) => {
          return (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          );
        })}
      </select>
      <div>
        {gearData
          .filter((gb) => gb.name === gbName)
          .map((gb) => {
            return (
              <div>
                <h2>{gb.name}</h2>
                <table>
                  <tr>
                    <th>Gear</th>
                    <th>Mainshaft</th>
                    <th>Layshaft</th>
                  </tr>
                  <tr>
                    <td>First</td>
                    <td>{gb.main1}</td>
                    <td>{gb.lay1}</td>
                  </tr>
                  <tr>
                    <td>Second</td>
                    <td>{gb.main2}</td>
                    <td>{gb.lay2}</td>
                  </tr>
                  <tr>
                    <td>Third</td>
                    <td>{gb.main3}</td>
                    <td>{gb.lay3}</td>
                  </tr>
                  <tr>
                    <td>Fourth</td>
                    <td>{gb.main4}</td>
                    <td>{gb.lay4}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        <br />
      </div>
    </>
  );
}
