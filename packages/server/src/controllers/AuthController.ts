import type { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../services/Controller";
import bcrypt from "bcrypt";
import { Users } from "../models";
import omit from "lodash/omit";

interface TAuthSignupBody {
  fullname: string;
  email: string;
  password: string;
}

interface TAuthLoginBody {
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

  @Controller.route("post", "/auth/login")
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as TAuthLoginBody;
    const users = await Users.select({ filter: { email }, cols: ["+hashedPassword"] });
    if (users.length === 0) {
      return await reply.code(401).send({ message: "Not authenticated" });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return await reply.code(401).send({ message: "Not authenticated" });
    }
    request.session.set("user", omit(user, ["hashedPassword"]));
    return await reply.code(200).send({ session: request.session });
  }
}
