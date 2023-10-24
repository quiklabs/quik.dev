import type { TColumnDatatype } from "./types";

interface IColumnConstructorArgs<M extends Record<string, any>> {
  name: keyof M;
  datatype: TColumnDatatype;
  hidden?: boolean;
}

export class Column<M extends Record<string, any>> {
  name;
  datatype;
  hidden;

  constructor({ name, datatype, hidden = false }: IColumnConstructorArgs<M>) {
    this.name = name;
    this.datatype = datatype;
    this.hidden = hidden;
  }
}
