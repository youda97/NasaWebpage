import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import {AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: String;
  password: String;
  
  constructor(private validateService: ValidateService, 
  private flashMessageService: FlashMessagesService,
  private authService: AuthService,
  private router: Router) {
  }

  ngOnInit() {
  }
  
  onRegisterSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    
    //Required Fields
    if(!this.validateService.validateRegister(user)){
     this.flashMessageService.show('Please fill in all fields!', {
      classes: ['alert', 'alert-danger']
    });
      return false;
    }
    
     //Required Fields
    if(!this.validateService.validateEmail(user.email)){
    this.flashMessageService.show('Please use a valid email!', {
      classes: ['alert', 'alert-danger']
    });
      return false;
    }
    
    // Register user
    this.authService.register(user).subscribe(
      res => {
        console.log(res.success);
        if(res.success){
        alert('You are now registered, please go verify your email before loging in!');
        this.router.navigate(['/login']);
        } else{
          alert(JSON.stringify(res.msg));
        }
        }, 
        err => {
          this.flashMessageService.show('Something bad happened!', {
            classes: ['alert', 'alert-danger'] });
        });
  }
  

}
