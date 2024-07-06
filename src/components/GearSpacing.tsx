import Table from "react-bootstrap/Table";
import { Ratios } from "@/lib/defs";
import { gearName, gearSpacingName } from "@/lib/data";

export default function GearSpacing({ intRatios }: { intRatios: Ratios }) {
  // get the internal ratios column and calculate the gear spacing
  let gearSpacing = "first - ";
  const overallSpacing = (intRatios[0] - 1).toFixed(2);
  // subtract each internal ratio from the previous one
  let spaces = intRatios
    .map((e, i) => {
      //return e - intRats[i + 1];
      return i + 1 < intRatios.length ? e - intRatios[i + 1] : null;
    })
    .filter((e) => e !== null);
  // create the gear spacing string
  spaces.map((e, i) => {
    if (i === 0 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - second - ";
    if (i === 1 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - third - ";
    if (i === 2 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - fourth";
    if (i === 3 && e)
      gearSpacing = gearSpacing + " - " + e.toFixed(1) + " - fifth";
  });

  return (
    <>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Gears</th>
            <th>Spacing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>first to top</td>
            <td>{overallSpacing}</td>
          </tr>
          {spaces.map((g, i) => {
            return (
              <tr key={i}>
                <td>{gearSpacingName[i]}</td>
                <td>{g != null ? parseFloat(g.toFixed(2)) : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
