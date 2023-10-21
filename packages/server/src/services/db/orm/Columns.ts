import type { Column } from "./Column";

export class Columns extends Array<Column> {
  getNames() {
    return this.filter((column) => !column.hidden).map((column) => column.name);
  }
}
