import Table from "react-bootstrap/Table";
import { Ratios } from "@/lib/defs";
import { gearName } from "@/lib/data";

export default function RatiosTable({
  intRatios,
  overallRatios,
}: {
  intRatios: Ratios;
  overallRatios: Ratios;
}) {
  // type RatiosTableRow = Array<[string, number, number, number]>;

  // // get the internal ratios column and calculate the gear spacing
  // const intRats = ratiosTable.map((v) => v[3]);
  // let gearSpacing = "first - ";
  // const overallSpacing = (intRats[0] - 1).toFixed(2);
  // // subtract each internal ratio from the previous one
  // let spaces = intRats
  //   .map((e, i) => {
  //     //return e - intRats[i + 1];
  //     return i + 1 < intRats.length ? e - intRats[i + 1] : null;
  //   })
  //   .filter((e) => e !== null);
  // // create the gear spacing string
  // spaces.map((e, i) => {
  //   if (i === 0 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - second - ";
  //   if (i === 1 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - third - ";
  //   if (i === 2 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - fourth";
  //   if (i === 3 && e)
  //     gearSpacing = gearSpacing + " - " + e.toFixed(1) + " - fifth";
  // });

  return (
    <>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Gear</th>
            <th>Internal Ratio</th>
            <th>Overall Ratio</th>
          </tr>
        </thead>
        <tbody>
          {intRatios.map((g, i) => {
            return (
              <tr key={i}>
                <td>{gearName[i]}</td>
                <td>{parseFloat(intRatios[i].toFixed(3))}</td>
                <td>{parseFloat(overallRatios[i].toFixed(3))}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
