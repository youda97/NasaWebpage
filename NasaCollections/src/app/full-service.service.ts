import { Injectable } from '@angular/core';

@Injectable()
export class FullServiceService {

link:any;
  constructor() { }
  
  putLink(resLink:String){
      this.link=resLink;
  }
  getLink(){
      return this.link;
  }

}