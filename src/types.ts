export interface ElmNode {
  type: "elm-format";
  body: string;
  source: string;
  start: number;
  end: number;
}
