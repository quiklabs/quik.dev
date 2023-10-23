import type { FastifyInstance } from "fastify";
import type { Model } from "../services/db/orm";

interface TControllersContructorArgs<IModelDef extends Record<string, any>> {
  fastify: FastifyInstance;
  model: Model<IModelDef>;
}

export class BaseControllers<IModelDef extends Record<string, any>> {
  fastify;
  model;

  constructor({ model, fastify }: TControllersContructorArgs<IModelDef>) {
    this.fastify = fastify;
    this.model = model;
  }
}

export class GenericControllers<IModelDef extends Record<string, any>> extends BaseControllers<IModelDef> {
  // ! arrow functions only otherwise it will create binding issues with fastify
  getById = async () => {
    const user = await this.model.findOne();
    return user;
  };

  getList = async () => {
    const user = await this.model.findAll();
    return user;
  };
}
