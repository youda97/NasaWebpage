import { Component, OnInit } from '@angular/core';
import {CollectionService} from "../collection.service";
import {AuthService} from "../auth.service";

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
  
  publicCollection: any;
  publicPhotos: any[];
  collectionButton: any[];
  myCollectionButton: any[];
  
  public isReady = false; // Used to make the image request wait on other things
  
  constructor(private authService: AuthService,
              private cService: CollectionService) {
                this.photos = [];
                this.publicPhotos = [];
                this.collectionButton = [];
                this.myCollectionButton = [];
              }
  
  showCollection(n){
    this.publicPhotos = [];
    this.cService.getTopTen().subscribe(
      res =>{
        var cn = res.collection[JSON.stringify(n)];
        var pos = 0;
        var i = 0;
        
        while (i < cn.imageList.length ){
            this.publicPhotos[i] = cn.imageList[JSON.stringify(pos++)];
            console.log(this.publicPhotos[i]);
            i++;
        }
      });
  }
  
  ngOnInit() {
    var thing = (this.authService.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    
    //Top ten collections
    this.cService.getTopTen().subscribe(
      res =>{
        this.publicCollection = res;
        
        var g = res.collection.length;
        var k = 0;
        // this.collectionButton = [{value: "Collection" + (k+1)}];
        while(k < g){
          var cn = res.collection[JSON.stringify(k)];
          this.collectionButton.push({value: cn.title, i: k, rating: cn.rating, isClicked: 0, email: cn.email});
          k++;
        }
      });
    
    //If logged in
    var thing = (this.authService.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    
    this.cService.getUserCollections(userEmail[0]).subscribe(
      res => {
        var j = res.collection.length;
        var n = 0;
        var d = 0;
        
        while( d < j){
        var cn = res.collection[JSON.stringify(d)];
        
        this.myCollectionButton.push({value: cn.title, i: d});
        d++;
        }
      });
  
    this.isReady = true;
  }
  
  showMyCollection(n){
    this.photos = [];
    var thing = (this.authService.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    console.log(userEmail[0]);
    
    this.cService.getUserCollections(userEmail[0]).subscribe(
      res => {
        var i = 0;
        var cn = res.collection[JSON.stringify(n)];
        var pos = 0;
        
        this.collectionNumber = this.collectionNumber + JSON.stringify(n+1); 
        while (i < cn.imageList.length ){
          this.photos[i] = cn.imageList[JSON.stringify(pos++)];
          i++;
        }
      });
  }
  
  upVote(n){
    // var user;
    if(this.collectionButton[n].isClicked == 1){
      
      console.log("asjfhksjdfhjsdhfjksdfhjsdhfj");
      this.collectionButton[n].isClicked = 0;
      
      this.cService.getTopTen().subscribe(
      res => {
        // user = res;
        var cn = res.collection[JSON.stringify(n)];
        this.cService.downVote(cn.email, cn._id).subscribe(
          res => {
            if(res.success){
              console.log(res.cln.rating);
            } else{
              console.log("FAILUEEEEEEEEEEEEEE");
            }
          });
      });
    this.collectionButton[n].rating = this.collectionButton[n].rating - 1;
    } 
    
    else{
      console.log("FDDD");
      this.collectionButton[n].isClicked = 1;
      
      this.cService.getTopTen().subscribe(
      res => {
        // user = res;
        var cn = res.collection[JSON.stringify(n)];
        this.cService.upVote(cn.email, cn._id).subscribe(
          res => {
            if(res.success){
              console.log(res.cln.rating);
            } else{
              console.log("FAILUEEEEEEEEEEEEEE");
            }
          });
      });
    this.collectionButton[n].rating = this.collectionButton[n].rating + 1;
    }
    
    
  }
}