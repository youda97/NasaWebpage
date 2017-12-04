import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router,ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms"


@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  id;
  title;
  center;
  photographer;
  location;
  date_created;
  description;
  href;
  
  constructor(private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getCollectionDetails(this.id).subscribe(collection => {
      
      this.title = collection.data[0].title;
      this.center = collection.data[0].center;
      this.photographer = collection.data[0].photographer;
      this.location = collection.data[0].location;
      this.date_created = collection.data[0].date_created;
      this.description = collection.data[0].description;
      this.href = collection.links[0].href;
    });
    
  }
  
    updateDateAdded(date){
    this.date_created = this.firebaseService.formatDate(date);
  }
  
    submitEdit(){
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
    this.firebaseService.updateCollection(this.id, collection);
    this.router.navigate(['/collection']);
  }

}
