import {Injectable} from '@angular/core';
import {UserProfile} from "../domain/Userprofile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  storeInfo(userProfile: UserProfile, roles: string[]) {
    let rolesString: string = roles.join(",");


    localStorage.setItem("email", userProfile.email);
    localStorage.setItem("firstName", userProfile.firstName);
    localStorage.setItem("lastName", userProfile.lastName);
    localStorage.setItem("token", userProfile.token);
    localStorage.setItem("roles", rolesString);

  }

  getInfo(): UserProfile {
    let userProfile: UserProfile = new UserProfile();

    userProfile.email = localStorage.getItem("email")
    userProfile.firstName = localStorage.getItem("firstName")
    userProfile.lastName = localStorage.getItem("lastName")
    userProfile.token = localStorage.getItem("token")
    userProfile.username = localStorage.getItem("username")

    return userProfile;
  }

  getRoles(): string[] {

    return localStorage.getItem("roles").split(",");
  }
}
