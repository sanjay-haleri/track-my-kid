import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

declare var google;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private _serv: DataService, private auth: AuthService) {}


  ionViewDidEnter() {
  }



  logout() {
    this.auth.logout();
  }
 

}
