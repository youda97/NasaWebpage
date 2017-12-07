import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    adminUser: any;
    
    constructor(private http:Http,
         private flashMessageService: FlashMessagesService,
          private router: Router) {   }
          
    getTheEmail(){
         var thing = (this.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    return userEmail[0];
    }
    
    register(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/register', user, {headers: headers})
            .map(res => res.json());
        // return this.http.post('users/register', user, {headers: headers})
        //     .map(res => res.json());
    
    }
    
    authenticateUser(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/authenticate ', user, {headers: headers})
            .map(res => res.json());
    }
    
    reSendVeri(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/re-verification-email ', user, {headers: headers})
            .map(res => res.json());
    }
    
    storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user; 
    }
    
    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    
    getProfile(){
        let headers=new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.get('https://youda-lab5-youda97.c9users.io:8081/users/profile ', {headers: headers})
            .map(res => res.json());
    }
    
    loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    
    loggedIn(){
      return tokenNotExpired('id_token');
    }
    
    isAdmin(){
        var thing = localStorage.getItem("user");
        
        if(thing == null){
            return false;
        }
        
        var splitter = thing.split('"__v":');
        var userV = splitter[1].split('"}') //makes sure we get the email portion of the object
        if(userV[0][0] == "2") {
            return true;
        }
        else {
            return false;
        }
        
    }
    
    returnEmail(){
    return (localStorage.getItem("user"));
    }
    
    changeSecurity(em, secure){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        const user = {
            email: em,
            sec: secure,
        }
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/updateSec', user, {headers: headers})
            .map(res => res.json());
    }
    
    getSecurity(){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
       return this.http.get('https://youda-lab5-youda97.c9users.io:8081/users/updateSec', {headers: headers})
            .map(res => res.json());
    }
    
    changePrivacy(em, priv){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        const user = {
            email: em,
            pri: priv,
        }
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/updatePriv', user, {headers: headers})
            .map(res => res.json());
    }
    
    getPrivacy(){
         let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        return this.http.get('https://youda-lab5-youda97.c9users.io:8081/users/updatePriv', {headers: headers})
            .map(res => res.json());
    }
    
    changeDMCA(em, dm){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        const user = {
            email: em,
            dmca: dm,
        }
        return this.http.post('https://youda-lab5-youda97.c9users.io:8081/users/updateDMCA', user, {headers: headers})
            .map(res => res.json());
    }
    
    getDMCA(){
         let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        return this.http.get('https://youda-lab5-youda97.c9users.io:8081/users/updateDMCA', {headers: headers})
            .map(res => res.json());
    }
    
}
