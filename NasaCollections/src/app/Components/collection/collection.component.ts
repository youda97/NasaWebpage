import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  allCollection: any;


  constructor(private firebaseService: FirebaseService) { 

    
  }


  ngOnInit() {

    this.firebaseService.getImages().subscribe(collection => {
      this.allCollection = collection;
    })
  }

}
