import { router } from "../../services/router";
import { Workspaces } from "../../services/db/models";

export async function getWorkspaceController() {
  const user = await Workspaces.findOne();
  return user;
}

export const getWorkspaceRoute = router("get", "/:id")(getWorkspaceController);
