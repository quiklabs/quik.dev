import type { Column } from "./Column";

export class Columns<M extends Record<string, any>> extends Array<Column<M>> {
  getNames() {
    return this.filter((column) => !column.hidden).map((column) => column.name);
  }
}
