import union from "lodash/union";
import type { Column, TColumnName } from "./Column";
import { sqlJoinIdents } from "./sql";
import difference from "lodash/difference";

interface TColumnListNamesOptions<M extends Record<string, any>> {
  cols?: Array<TColumnName<M> | string>;
}
interface TColumnListIdentsOptions<M extends Record<string, any>> {
  cols?: Array<TColumnName<M> | string>;
}

interface TColumnListIdentsWithParentOptions<M extends Record<string, any>> {
  cols?: Array<TColumnName<M> | string>;
}

export class ColumnList<M extends Record<string, any>> {
  UNSAFE_colDefs: Array<Column<M>>;
  colDefs: Array<Column<M>>;

  constructor(cols: Array<Column<M>>) {
    this.UNSAFE_colDefs = cols;
    this.colDefs = this.UNSAFE_colDefs.filter((c) => !c.hidden);
  }

  names({ cols = [] }: TColumnListNamesOptions<M> = {}) {
    let colNames = this.colDefs.map((column) => column.name);
    for (const col of cols) {
      const op = col.charAt(0);
      const colName = col.slice(1) as TColumnName<M>;
      if (op === "+") {
        colNames = union(colNames, [colName]);
      } else if (op === "-") {
        colNames = difference(colNames, [colName]);
      } else {
        throw new Error(`col op cannot be ${op}`);
      }
    }
    return colNames;
  }

  idents({ cols = [] }: TColumnListIdentsOptions<M> = {}) {
    const colNames = this.names({ cols });
    return sqlJoinIdents(colNames.map((c) => c.toString()));
  }

  identsWithParent(parent: string, { cols = [] }: TColumnListIdentsWithParentOptions<M> = {}) {
    const colNames = this.names({ cols });
    return sqlJoinIdents(colNames.map((c) => [c.toString(), parent]));
  }
}
