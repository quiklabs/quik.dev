import { Controller } from "../services/Controller";

export class ProjectController extends Controller {
  @Controller.route("get", "/:id")
  async getById() {
    console.log("in method");
    return { hi: "there" };
  }
}
