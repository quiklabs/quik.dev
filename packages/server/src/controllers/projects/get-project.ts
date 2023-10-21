import { router } from "../../services/router";
import { Projects } from "../../services/db/models";

export async function getProjectController() {
  const user = await Projects.findOne();
  return user;
}

export const getProjectRoute = router("get", "/:id")(getProjectController);
