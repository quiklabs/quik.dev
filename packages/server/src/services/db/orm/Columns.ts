import type { Column } from "./Column";

export class Columns {
  value: Column[];

  constructor(value: Column[]) {
    this.value = value;
  }

  getNames() {
    return this.value.filter((column) => !column.hidden).map((column) => column.name);
  }
}
