import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post("http://localhost:3000/api/users/signup", authData);
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    return this.http.post("http://localhost:3000/api/users/login", authData);
  }
}

//authentication services for login and creating user
