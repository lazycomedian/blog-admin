import { bizRequest } from "..";

export class RoleController {
  static list() {
    return bizRequest.get("/admin/role/list");
  }
}
