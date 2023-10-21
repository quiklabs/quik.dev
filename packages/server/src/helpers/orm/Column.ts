import { type TColumnDatatype } from "./types";

interface IColumnConstructorArgs {
  name: string;
  datatype: TColumnDatatype;
  hidden?: boolean;
}

export class Column {
  name: string;
  datatype: TColumnDatatype;
  hidden: boolean;

  constructor({ name, datatype, hidden = false }: IColumnConstructorArgs) {
    this.name = name;
    this.datatype = datatype;
    this.hidden = hidden;
  }
}
