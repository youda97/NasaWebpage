import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {
id:any;
title;
center;
photographer;
location;
date_created;
description;
href;

  constructor(private firebaseService: FirebaseService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    // get the image ID
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getCollectionDetails(this.id).subscribe(collection => {
      console.log('collection details: '+JSON.stringify(collection));
      
      this.title = collection.data[0].title;
      this.center = collection.data[0].center;
      this.photographer = collection.data[0].photographer;
      this.location = collection.data[0].location;
      this.date_created = collection.data[0].date_created;
      this.description = collection.data[0].description;
      this.href = collection.links[0].href;
    })
  }

}
