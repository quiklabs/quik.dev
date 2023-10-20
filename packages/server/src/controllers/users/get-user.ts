import { router } from "../../helpers/router";

export async function getUserController() {
  return { hello: "world" };
}

export const getUserRoute = router("get", "/:id")(getUserController);
