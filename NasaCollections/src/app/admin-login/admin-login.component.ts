import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  dmca: String;
  privacy: String;
  security: String;
  
  constructor(private authService: AuthService,
            private router: Router,
            private flashMessage: FlashMessagesService) { }

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
                    this.dmca = res.user.theDMCA;
                  });
  }
}
