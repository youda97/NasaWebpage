import { Component, OnInit } from '@angular/core';
import { AdminService } from "../admin.service";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  security:String;
  privacy:String;
  dmca:String;

  constructor(private admin: AdminService,
              private authService: AuthService ) {}

  ngOnInit() {
    this.security = "LOL";
  }
  
  onSave(){
    var thing = this.authService.returnEmail();
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    
    this.authService.changeSecurity(userEmail[0], this.security);
    // this.authService.changePrivacy(userEmail[0], this.privacy);
    // this.authService.changeDmca(userEmail[0], this.dmca);
  }

}
