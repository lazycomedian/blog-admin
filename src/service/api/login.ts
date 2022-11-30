import { bizRequest } from "..";

export class LoginController {
  static login(data: { userName: string; password: string }) {
    return bizRequest.post<{ token: string }>("/api/user/login", data);
  }
}
