import {Injectable} from '@angular/core';
import {UserProfile} from "../domain/Userprofile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  storeInfo(userProfile: UserProfile) {
    localStorage.setItem("email", userProfile.email);
    localStorage.setItem("firstName", userProfile.firstName);
    localStorage.setItem("lastName", userProfile.lastName);
    localStorage.setItem("token", userProfile.token);
    localStorage.setItem("plz", userProfile.attributes["postal_code"] as string);
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
}
