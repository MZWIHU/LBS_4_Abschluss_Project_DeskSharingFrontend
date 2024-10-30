import {Injectable} from '@angular/core';
import {UserProfile} from "../domain/Userprofile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.storeInfo({attributes: {"department": "ACPR"}, username: "ZWM", lastName: "Mustermann", firstName: "Martin", email: "test@test.com", token: "" }, ["admin"])
  }

  storeInfo(userProfile: UserProfile, roles: string[]) {
    let rolesString: string = roles.join(",");
    sessionStorage.setItem("email", userProfile.email);
    sessionStorage.setItem("firstName", userProfile.firstName);
    localStorage.setItem("firstName", userProfile.firstName);
    sessionStorage.setItem("lastName", userProfile.lastName);
    sessionStorage.setItem("username",userProfile.username);
    sessionStorage.setItem("token", userProfile.token);
    sessionStorage.setItem("roles", rolesString);
    sessionStorage.setItem("department", userProfile.attributes["department"] as string);

  }

  getInfo(): UserProfile {
    let userProfile: UserProfile = new UserProfile();

    userProfile.email = sessionStorage.getItem("email")
    userProfile.firstName = sessionStorage.getItem("firstName")
    userProfile.lastName = sessionStorage.getItem("lastName")
    userProfile.token = sessionStorage.getItem("token")
    userProfile.username = sessionStorage.getItem("username")

    return userProfile;
  }

  getRoles(): string[] {

    return sessionStorage.getItem("roles").split(",");
  }
}
