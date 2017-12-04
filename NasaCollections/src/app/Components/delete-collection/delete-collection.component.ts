import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-delete-collection',
  templateUrl: './delete-collection.component.html',
  styleUrls: ['./delete-collection.component.css']
})
export class DeleteCollectionComponent implements OnInit {

 id: any;
  collectionTitle: any;
  collectionDescription: any;
  
  constructor(private firebaseService: FirebaseService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    // get the collection ID
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getCollectionDetails(this.id).subscribe(collection => {
      this.collectionTitle = collection.title;
      this.collectionDescription = collection.description;
    });
  }

  removeCollection(){
    this.firebaseService.deleteCollection(this.id);
    this.router.navigate([''])
  }
}
