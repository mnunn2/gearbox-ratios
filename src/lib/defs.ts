export type GearBox = {
  id: number;
  name: string;
  main1: number;
  lay1: number;
  main2: number;
  lay2: number;
  main3: number;
  lay3: number;
  main4: number | null;
  lay4: number | null;
  main5?: number | null;
  lay5?: number | null;
  main6?: number | null;
  lay6?: number | null;
};
export type Sproc = {
  [key: string]: number;
  en: number;
  cl: number;
  gb: number;
  rw: number;
};
export type GearBoxs = GearBox[];
export type Gears = number[][];
export type Ratios = number[];

export const enum Shaft {
  main,
  lay,
}
