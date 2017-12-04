import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  collection: FirebaseListObservable<any[]>; ; //from Firebase
  topTen: Observable<any>

  constructor(private db: AngularFireDatabase) { }
  
  getImages(){
        this.collection = this.db.list('/collection/items')as FirebaseListObservable<any[]>;
        return this.collection;

  } 
  
  getTopRating(){
      //Order by rating of image
      
      this.topTen = this.db.list('/collection/items').map(collection => {
      const topImages = collection.filter(item => item.$key < 10 );
      return topImages;
    })
    return this.topTen;
      
  }

}
