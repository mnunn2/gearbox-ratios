import Table from "react-bootstrap/Table";
import { Gears, Shaft, Ratios } from "@/lib/defs";
import { gearName } from "@/lib/data";

export default function GearsTable({
  gears,
  intRatios,
}: {
  gears: Gears;
  intRatios: Ratios;
}) {
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
          {gears.map((g, i) => {
            return (
              <tr key={i}>
                <td>{gearName[i]}</td>
                <td>{g[Shaft.main]}</td>
                <td>{g[Shaft.lay]}</td>
                <td>{parseFloat(intRatios[i].toFixed(3))}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
