// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '4fQjNamSt8fwhI3nK7oMxd1nnt016G0Q',
    domain: 'youda.auth0.com',
    responseType: 'token id_token',
    audience: 'https://youda.auth0.com/userinfo',
    redirectUri: 'https://youda-lab5-youda97.c9users.io/',      
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}