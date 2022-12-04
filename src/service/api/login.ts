import { bizRequest } from "..";

export class LoginController {
  static login(data: { username: string; password: string }) {
    return bizRequest.post<{ token: string }>("/login", data);
  }

  static logout() {
    return bizRequest.post("/logout");
  }
}
