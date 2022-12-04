import { bizRequest } from "..";

export class TestService {
  static test() {
    return bizRequest.get("/test");
  }
}
