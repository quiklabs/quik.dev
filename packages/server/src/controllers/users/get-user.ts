import { router } from "../../helpers/router";
import { Users } from "../../models/Users";

export async function getUserController() {
  const user = await Users.findOne();
  return user;
}

export const getUserRoute = router("get", "/:id")(getUserController);
