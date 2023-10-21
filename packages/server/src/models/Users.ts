import { Column, Columns, Model } from "../helpers/orm";

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  hashed_password: string; // should be hidden
  created_on: Date;
  updated_on: Date;
}

export const Users = new Model<IUser>({
  schema: "public",
  table: "users",
  columns: new Columns([
    new Column({ name: "id", datatype: "uuid" }),
    new Column({ name: "fullname", datatype: "text" }),
    new Column({ name: "email", datatype: "text" }),
    new Column({ name: "hashed_password", datatype: "text" }),
    new Column({ name: "created_on", datatype: "timestamptz" }),
    new Column({ name: "updated_on", datatype: "timestamptz" }),
  ]),
});
