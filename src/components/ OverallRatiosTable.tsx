import Table from "react-bootstrap/Table";
import { Ratios } from "@/lib/defs";
import { gearName } from "@/lib/data";

export default function OverallRatiosTable({
  overallRatios,
}: {
  overallRatios: Ratios;
}) {
  return (
    <>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Gear</th>
            <th>Overall Ratios</th>
          </tr>
        </thead>
        <tbody>
          {overallRatios.map((r, i) => {
            return (
              <tr key={i}>
                <td>{gearName[i]}</td>
                <td>{parseFloat(r.toFixed(3))}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
