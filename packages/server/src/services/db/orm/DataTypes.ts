import type { types } from "pg";

export type TDataType = Lowercase<Extract<keyof typeof types.builtins, string>>;
