import { Component, OnInit } from '@angular/core';
import { AdminService } from "../admin.service";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  security: String;
  privacy:String;
  DMCA:String;

  constructor(private admin: AdminService,
              private authService: AuthService ) { }
  
  ngOnInit() {
    this.authService.getSecurity().subscribe(
                  res => {
                    console.log("VALUES UPDATING");
                    console.log(res);
                    this.security = res.user.sec;
                  });
    this.authService.getPrivacy().subscribe(
                  res => {
                    console.log("VALUES UPDATING");
                    console.log(res);
                    this.privacy = res.user.pri;
                  });
                  
    this.authService.getDMCA().subscribe(
                  res => {
                    console.log("VALUES UPDATING");
                    console.log(res);
                    this.DMCA = res.user.theDMCA;
                  });
    
  }
  
  onSaveSecurity(){
    var thing = this.authService.returnEmail();
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    
    this.authService.changeSecurity("mustafadawoud97@gmail.com", this.security).subscribe(
      res =>{
        this.security = res.user.sec;
      });
  }
  
  onSavePolicies(){
    this.authService.changePrivacy("mustafadawoud97@gmail.com", this.privacy).subscribe(
      res =>{
        this.privacy = res.user.pri;
      });
  }
  
  onSaveDMCA(){
      this.authService.changeDMCA("mustafadawoud97@gmail.com", this.DMCA).subscribe(
      res =>{
        this.DMCA = res.user.theDMCA;
      });
  }

}
