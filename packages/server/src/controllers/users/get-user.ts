import { router } from "../../services/router";
import { Users } from "../../services/db/models";

export async function getUserController() {
  const user = await Users.findOne();
  return user;
}

export const getUserRoute = router("get", "/:id")(getUserController);
