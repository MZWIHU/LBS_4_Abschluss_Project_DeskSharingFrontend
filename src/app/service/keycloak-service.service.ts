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
  private _roles: string[] = [];

  constructor() {
    this.init()
  }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: "http://20.250.170.242:8080",
        realm: "master",
        clientId: "login-app"
      })
    }
    return this._keycloak;
  }

  get profile() {
    return this._profile;
  }

  get roles() {
    return this._roles;
  }

  async init() {
    //console.log("init")
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      //checkLoginIframe: false
      checkLoginIframe: false,
      flow: 'standard',
    });

    if (authenticated) {
      //console.log("User authenticated")
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._roles = this.keycloak.tokenParsed.realm_access.roles;
      //console.log(this.keycloak.tokenParsed.realm_access.roles);
      this._profile.token = this.keycloak.token;
      this._profile.username = this.profile.username;
      this._profile.attributes = this.profile.attributes;
      //console.log(this._profile)
      this.authService.storeInfo(this._profile, this._roles)

    }
  }

  logout() {
    return this.keycloak?.logout({redirectUri: "http://localhost:4200"});
  }
}
