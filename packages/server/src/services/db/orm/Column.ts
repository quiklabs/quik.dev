import type { TDataType } from "./DataTypes";

export type TColumnName<M extends Record<string, any>> = Extract<keyof M, string>;

interface TColumnConstructorArgs<M extends Record<string, any>> {
  name: TColumnName<M>;
  datatype: TDataType;
  required?: boolean;
  defaultValue?: any;
  hidden?: boolean;
}

export class Column<M extends Record<string, any>> {
  name;
  datatype;
  required;
  defaultValue;
  hidden;

  constructor({ name, datatype, required = false, defaultValue = null, hidden = false }: TColumnConstructorArgs<M>) {
    this.name = name;
    this.datatype = datatype;
    this.required = required;
    this.defaultValue = defaultValue;
    this.hidden = hidden;
  }
}
