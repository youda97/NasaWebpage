import { Component, OnInit } from '@angular/core';
import {CollectionService} from "../collection.service";
import {AuthService} from "../auth.service";

// import {Http} from '@angular/http';
// //import { DataService } from '../data.service';
// import {Router} from '@angular/router';
// import { NasaApiService } from '../../services/nasa-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  photos: any[];
  happy: any;
  rating: any;
  collectionNumber: String;
  image: any[];
  count: number;
  
  public isReady = false; // Used to make the image request wait on other things
  
  constructor(private authService: AuthService,
              private cService: CollectionService) {
                this.photos = [];
              }
  
  ngOnInit() {
    this.collectionNumber = "Collection ";
    var thing = (this.authService.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    console.log(userEmail[0]);
    this.cService.getUserCollections(userEmail[0]).subscribe(
      (res: any) => {
        var j = res.collection.length;
        var n = 0;
        var i = 0;
        
        while( n < j){
          console.log(res.collection[JSON.stringify(n)]);
          var cn = res.collection[JSON.stringify(n)];
          console.log(cn);
          console.log(n);
          var pos = 0;
          var constI = i;
          this.collectionNumber = this.collectionNumber + JSON.stringify(n+1); 
          while (i < constI + cn.imageList.length ){
            this.photos[i] = cn.imageList[JSON.stringify(pos++)];
            console.log(this.photos[i]);
            i++;
        }
        this.collectionNumber = "Collection ";
          n++;
        }
        
      
      });
  
    this.isReady = true;
  }
  
  test(){
        // console.log(this.happy);
  }
  
  removeFromCollection(photo){
    /*console.log("1");
    console.log(photo);
    console.log(this.photos)
    this.photos[this.count]= []
    this.count++;
    console.log(this.photos)*/
  }
  
  
  upVote(collection){
  collection.rating++;
  }
}