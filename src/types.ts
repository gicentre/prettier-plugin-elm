export type ElmNode = {
  type: "elm-format";
  body: string;
  source: string;
  start: number;
  end: number;
};
