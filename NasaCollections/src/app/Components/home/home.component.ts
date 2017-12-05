import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topTen: any;

  collectionTitle = "Nasa Collections";
  
  //authentication related
  authenticated;
  user: Observable<firebase.User>;

  constructor(private firebaseService: FirebaseService, public af: AngularFireAuth) {
    this.authenticated = false;

    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      });
    
    
  }
  ngOnInit() {
    this.firebaseService.getTopRating().subscribe(top =>{
      this.topTen = top;
      //console.log(this.topTen);
    })
  }

}
