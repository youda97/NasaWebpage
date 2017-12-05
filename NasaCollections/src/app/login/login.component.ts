import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  public reS = false;
  message: Boolean;
  
  constructor(private authService: AuthService,
            private router: Router,
            private flashMessage: FlashMessagesService
           ){  }
  

  ngOnInit() {
  }
  
  onLoginSubmit(){
    
   // if(this.email == "mustafadawoud97@gmail.com" && this.password == "ok"){
      // this.flashMessage.show('Signed in as Admin', {
      //       classes: ['alert', 'alert-success'] });
      //      this.admin.changeMessage(true);
            // this.administrator = true;
   // }
    const user = {
      email: this.email,
      password: this.password,
      __v: 0
    }
    
    this.authService.authenticateUser(user).subscribe(
      res => {
        console.log("LOGIN USER");
        console.log(res.user);
        if(!(res.success)){
          this.flashMessage.show(res.msg, {
            classes: ['alert', 'alert-danger'] });
          //  this.router.navigate(['/login']);
        } 
        
        else if(res.user.__v == 2){
          this.flashMessage.show("You are now logged as admin", {
          classes: ['alert', 'alert-success'] });
          this.authService.storeUserData(res.token, res.user);
        }
        
        else if(res.user.__v == 0){
          alert( "Your account is still not verified, if you want to have the verification email re-send, please put the email you registered with in the email section and click on the resent verification button");
            this.router.navigate(['/login']);
            this.reS = true;
        }
        
        else{
          this.flashMessage.show("You are now logged in", {
            classes: ['alert', 'alert-success'] });
          this.authService.storeUserData(res.token, res.user);
          this.router.navigate(['/profile']);
        }
        this.authService.isAdmin();
      },
      err =>{
        this.flashMessage.show('Something bad happened!', {
            classes: ['alert', 'alert-danger'] });
      });
  }
  
  onResendVerification(){
    const user = {
      email: this.email,
      password: this.password,
      __v: 0
    }
    this.authService.reSendVeri(user).subscribe(
      res =>{
         this.flashMessage.show("Verification Email Re-sent", {
            classes: ['alert', 'alert-success'] });
      }
    );
  }

}