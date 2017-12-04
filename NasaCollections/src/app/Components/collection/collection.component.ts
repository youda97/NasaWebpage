import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  
  collection: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) { 
    this.collection = db.list('/collection/items');
 
    this.collection.forEach((rec)=>{
      console.log(rec);
      });
    
  }


  ngOnInit() {
  }

}
