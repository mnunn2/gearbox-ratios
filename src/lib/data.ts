export type GearBox = {
  id: number;
  name: string;
  main1: number;
  lay1: number;
  main2: number;
  lay2: number;
  main3: number;
  lay3: number;
  main4: number;
  lay4: number;
  main5?: number;
  lay5?: number;
};

export type IntRatios = [number, number, number, number, number?];

type GearBoxs = GearBox[];

export const gearData: GearBoxs = [
  { id: 1, name: "default", main1: 16, lay1: 27, main2: 21, lay2: 22, main3: 24, lay3: 19, main4: 22, lay4: 14, },
  { id: 2, name: "b40Wd", main1: 17, lay1: 33, main2: 20, lay2: 30, main3: 25, lay3: 25, main4: 22, lay4: 14, },
  { id: 3, name: "b25-44", main1: 16, lay1: 27, main2: 21, lay2: 22, main3: 24, lay3: 19, main4: 22, lay4: 14, },
  { id: 4, name: "b series std", main1: 16, lay1: 27, main2: 20, lay2: 23, main3: 24, lay3: 19, main4: 26, lay4: 17, },
  { id: 5, name: "b series rrt2", main1: 19, lay1: 24, main2: 22, lay2: 21, main3: 24, lay3: 19, main4: 25, lay4: 18, },
  { id: 6, name: "Triumph 4 speed pre 69", main1: 16, lay1: 30, main2: 20, lay2: 26, main3: 24, lay3: 22, main4: 26, lay4: 20, },
  { id: 7, name: "Triumph 4 speed 69 on", main1: 16, lay1: 30, main2: 20, lay2: 26, main3: 23, lay3: 22, main4: 26, lay4: 20, },
  { id: 8, name: "Triumph 5 speed", main1: 13, lay1: 24, main2: 16, lay2: 21, main3: 18, lay3: 18, main4: 20, lay4: 17, main5: 21, lay5: 15, }, 
];
