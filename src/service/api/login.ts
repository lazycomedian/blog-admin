import { bizRequest } from "..";

export class LoginService {
  static login(data: { userName: string; password: string }) {
    return bizRequest.post("/api/user/login", data);
  }
}
