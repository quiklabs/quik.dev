import type { FastifyInstance } from "fastify";
import type { Model } from "../services/db/orm";
import { IUser } from "../models";

interface TControllersContructorArgs<M extends Record<string, any>> {
  fastify: FastifyInstance;
  model: Model<M>;
}

export class BaseControllers<M extends Record<string, any>> {
  fastify;
  model;

  constructor({ model, fastify }: TControllersContructorArgs<M>) {
    this.fastify = fastify;
    this.model = model;
  }
}

export class GenericControllers<M extends Record<string, any>> extends BaseControllers<M> {
  // ! arrow functions only otherwise it will create binding issues with fastify
  getById = async () => {
    const user = await this.model.selectById("c7d8c0f0-5284-4fab-98e6-ff8373fc5df0");
    return user;
  };

  getList = async () => {
    // @ts-expect-error sss
    const user = await this.model.select({ filter: { fullname: "rudra" }, pick: ["id", "fullname"] });
    return user;
  };
}
