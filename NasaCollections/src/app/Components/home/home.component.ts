import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topTen: any;

  collectionTitle = "Nasa Collections";


  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getTopRating().subscribe(top =>{
      this.topTen = top;
      console.log(this.topTen);
    })
  }

}
