import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  title;
  center;
  photographer;
  location;
  date_created;
  description;
  href;
  
  
  constructor(private firebaseService:FirebaseService,
    private router:Router) { }

  ngOnInit() {}
  updateDateAdded(date_created){
    this.date_created = this.firebaseService.formatDate(date_created);
  }

  submitAdd(){
    let collection = {
      data:  [{
          title: this.title,
          center: this.center,
          photographer: this.photographer,
          location: this.location,
          date_created: this.date_created,
          description: this.description,
          href: this.href
        
      }],
      links:  [{
          href: this.href
      }]
    }
    

   // alert('Collection - ',collection);
    this.firebaseService.addCollection(collection);
    this.router.navigate(['collection']);
  }

}
