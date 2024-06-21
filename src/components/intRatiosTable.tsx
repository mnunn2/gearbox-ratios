// takes a GearBox object and returns a table of the internal ratios
// and gear spacing, sets the internal ratios array.
import { useEffect } from "react";
import { IntRatios } from "@/lib/data";
import Table from "react-bootstrap/Table";
import { GearBox } from "@/lib/data";

const calcInt = (main: number, lay: number, topDiv: number): number => {
  return parseFloat(((lay / main) * topDiv).toFixed(3));
};

export default function IntRatiosTable({
  gb,
  setIntRatios,
}: {
  gb: GearBox;
  setIntRatios: Function;
}) {
  type RatiosTableRow = Array<[string, number, number, number]>;
  // build the ratio table and calc internal ratios
  let topDiv: number = 0;
  const tmpTable: RatiosTableRow = [];
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

  const ratiosTable: RatiosTableRow = [
    ["first", gb.main1, gb.lay1, calcInt(gb.main1, gb.lay1, topDiv)],
    ["second", gb.main2, gb.lay2, calcInt(gb.main2, gb.lay2, topDiv)],
    ["third", gb.main3, gb.lay3, calcInt(gb.main3, gb.lay3, topDiv)],
  ];

  ratiosTable.push(...tmpTable);

  // get the internal ratios column and calculate the gear spacing
  const intRats = ratiosTable.map((v) => v[3]);
  let gearSpacing = "first - ";
  const overallSpacing = (intRats[0] - 1).toFixed(2);
  // subtract each internal ratio from the previous one
  let spaces = intRats
    .map((e, i) => {
      //return e - intRats[i + 1];
      return i + 1 < intRats.length ? e - intRats[i + 1] : null;
    })
    .filter((e) => e !== null);

  spaces.map((e, i) => {
    if (i === 0 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - second - ";
    if (i === 1 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - third - ";
    if (i === 2 && e) gearSpacing = gearSpacing + e.toFixed(1) + " - fourth";
    if (i === 3 && e)
      gearSpacing = gearSpacing + " - " + e.toFixed(1) + " - fifth";
  });

  // set the internal ratios state in grand parent component
  // useEffect with no params ensures it is only set once
  useEffect(() => {
    setIntRatios([intRats]);
  }, []);

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
      <p>overall spacing: first - {overallSpacing} - top</p>
    </>
  );
}
