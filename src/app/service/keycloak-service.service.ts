import {inject, Injectable} from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../domain/Userprofile";
import {AuthService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private authService: AuthService = inject(AuthService);

  constructor() {
    this.init()
  }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: "http://localhost:8080",
        realm: "DeskSharing",
        clientId: "login-app"
      })
    }
    return this._keycloak;
  }

  get profile() {
    return this._profile;
  }

  async init() {
    console.log("init")
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      //checkLoginIframe: false
      checkLoginIframe: false,
      flow: 'standard',
    });

    if (authenticated) {
      console.log("User authenticated")
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token;
      this._profile.username = this.profile.username;
      console.log(this._profile)
      this.authService.storeInfo(this._profile)

    }
  }

  logout() {
    return this.keycloak?.logout({redirectUri: "http://localhost:4200"});
  }
}
