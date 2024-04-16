import {Component, OnInit} from '@angular/core';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    isAuthenticated = false;

    constructor(public oidcService: OidcSecurityService) {
    }

    ngOnInit(): void {
      this.oidcService
        .checkAuth()
        .subscribe((loginResponse: LoginResponse) => {
          const { isAuthenticated, userData, accessToken, idToken, configId } =
            loginResponse;
          this.isAuthenticated = loginResponse.isAuthenticated;
          console.log(isAuthenticated);
        });
    }

    login() {
      this.oidcService.authorize();
    }

    logout() {
      this.oidcService
        .logoff()
        .subscribe((result) => console.log(result));
    }

}
