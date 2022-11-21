import { bizRequest } from "..";

export class LoginService {
  static login() {
    const data = new URLSearchParams();
    data.append("username", "123");
    data.append("password", "asd");

    return bizRequest.post("/login", {
      data: data
    });
  }
}
