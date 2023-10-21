import { type Column } from "./Column";

export class Columns {
  value: Column[];

  constructor(value: Column[]) {
    console.log({ value });
    this.value = value;
  }

  getNames() {
    return this.value.map((column) => column.name);
  }
}
