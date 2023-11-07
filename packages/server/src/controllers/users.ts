import { Controller } from "../services/Controller";

export class UserController extends Controller {
  @Controller.route("get", "/:id")
  async getById() {
    console.log("in method");
    return { hi: "there" };
  }
}
