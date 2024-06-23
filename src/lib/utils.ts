import { Gears } from "./defs";
import { Ratios } from "./defs";
import { GearBox } from "./defs";

export const getGears = (gb: GearBox): Gears => {
  // takes a gearbox object and returns an array of gear number pairs [main, lay]
  let gears: Gears = [];

  if (gb.main1 && gb.lay1) gears.push([gb.main1, gb.lay1]);
  if (gb.main2 && gb.lay2) gears.push([gb.main2, gb.lay2]);
  if (gb.main3 && gb.lay3) gears.push([gb.main3, gb.lay3]);
  if (gb.main4 && gb.lay4) gears.push([gb.main4, gb.lay4]);
  if (gb.main5 && gb.lay5) gears.push([gb.main5, gb.lay5]);
  if (gb.main6 && gb.lay6) gears.push([gb.main6, gb.lay6]);
  return gears;
};

export const calcInternalRatios = (gears: Gears): Ratios => {
  // takes an array of gear number pairs [main, lay] and returns an array of internal ratios first gear to top gear
  const enum Shaft {
    main,
    lay,
  }
  const top = gears[gears.length - 1];
  let ratios: number[] = [];
  gears.forEach((g) => {
    ratios.push(
      (g[Shaft.lay] / g[Shaft.main]) * (top[Shaft.main] / top[Shaft.lay]),
    );
  });
  return ratios;
};
