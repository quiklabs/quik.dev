import { Controller } from "../services/Controller";

export class WorkspaceController extends Controller {
  @Controller.route("get", "/workspaces/:id")
  async getById() {
    console.log("in method");
    return { hi: "there" };
  }
}
