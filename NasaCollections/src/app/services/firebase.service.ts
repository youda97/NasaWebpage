import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  collection: FirebaseListObservable<any[]>; ; //from Firebase
  topTen: Observable<any>
  collectionDetails: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
      this.collection = db.list('/collection/items');
  }
  
  getImages(){
        this.collection = this.db.list('/collection/items')as FirebaseListObservable<any[]>;
        return this.collection;

  } 
  
  getTopRating(){
      //Order by rating of image
      
      this.topTen = this.db.list('/collection/items').map(collection => {
      const topImages = collection.filter(item => item.$key < 10 );
      console.log(collection.href);
      return topImages;
    })
    return this.topTen;
      
  }
  
    getCollectionDetails(id){
        this.collectionDetails = this.db.object('/collection/items/' + id) as Observable<any>;
        return this.collectionDetails;     
  }
  
   addCollection(collectionDetails){
    var filteredCollection = JSON.parse(JSON.stringify(collectionDetails)); //removes the undefined fields
   // alert('Filtered Collection - ',filteredCollection);
    return this.collection.push(filteredCollection);
  }
  
    formatDate(date: Date): string{
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      return '${year}-${month}-${day}';
    }
  
    updateCollection(id, collectionDetails){
        var filteredCollection = JSON.parse(JSON.stringify(collectionDetails)); //removes the undefined fields
        return this.collection.update(id,filteredCollection);
    }

}
