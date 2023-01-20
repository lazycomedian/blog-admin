import { bizRequest } from "@/utils";

export class LoginService {
  static login(data: { username: string; password: string }) {
    return bizRequest.post<{ token: string }>("/login", data);
  }

  static logout() {
    return bizRequest.post("/logout");
  }
}
