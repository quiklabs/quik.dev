import format from "pg-format";

export class Stmt {
  partials: string[] = [];
  partialParams: Array<string | string[]> = [];
  values: any[] = [];

  addStmt(stmt: Stmt) {
    this.partials = this.partials.concat(stmt.partials);
    this.partialParams = this.partialParams.concat(stmt.partialParams);
    this.values = this.values.concat(stmt.values);
  }

  addPartials(...partials: string[]) {
    this.partials = this.partials.concat(partials);
  }

  addPartialParams(...partialParams: Array<string | string[]>) {
    this.partialParams = this.partialParams.concat(partialParams);
  }

  addValues(...values: any[]) {
    this.values = this.values.concat(values);
  }

  build() {
    const unescaped = this.partials.join("");
    const escaped = format(unescaped, ...this.partialParams);

    let n = 1;
    const text = escaped.replace(/\?/g, () => `$${n++}`);

    const values = this.values;

    return { text, values };
  }
}
