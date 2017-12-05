import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import {AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticated: boolean = false;
  
  constructor( public af: AngularFireAuth, private as: AuthService) { 
    this.af.authState.subscribe(
      (auth) => {
        
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      });
  }

  ngOnInit() {
  }

  login() {
    //this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.as.login();
    this.authenticated = true;
    
  }

 logout() {
  this.af.auth.signOut();
    this.authenticated = false;
  }
}

