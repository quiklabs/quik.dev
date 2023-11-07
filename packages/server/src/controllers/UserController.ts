import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../services/Controller";
import { Users } from "../models";

interface TUserGetByIdParams {
  id: string;
}

// interface TUserGetAllQueryParams {
//   q: string;
// }

export class UserController extends Controller {
  @Controller.route("get", "/:id")
  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as TUserGetByIdParams;
    const user = await Users.selectById(id);
    return await reply.code(200).send({ user });
  }

  @Controller.route("get", "/")
  async getMany(request: FastifyRequest, reply: FastifyReply) {
    const users = await Users.select();
    return await reply.code(200).send({ users });
  }
}
