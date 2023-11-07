import { Controller } from "../services/Controller";

export class WorkspaceController extends Controller {
  @Controller.route("get", "/:id")
  async getById() {
    console.log("in method");
    return { hi: "there" };
  }
}
