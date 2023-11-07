import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../services/Controller";
import bcrypt from "bcrypt";
import { Users } from "../models";

interface TAuthSignupBody {
  fullname: string;
  email: string;
  password: string;
}

export class AuthController extends Controller {
  @Controller.route("post", "/auth/signup")
  async signup(request: FastifyRequest, reply: FastifyReply) {
    const { fullname, email, password } = request.body as TAuthSignupBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const body = { fullname, email, hashedPassword };
    const user = await Users.insertOne({ body });
    return await reply.code(201).send({ user });
  }
}
