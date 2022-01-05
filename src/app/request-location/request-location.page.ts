import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-request-location',
  templateUrl: './request-location.page.html',
  styleUrls: ['./request-location.page.scss'],
})
export class RequestLocationPage implements OnInit {

  isSynced: boolean = false;

  constructor(private geolocation: Geolocation, private _serv: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.getMyLocation();
  }

  getMyLocation() {
    let watch = this.geolocation.watchPosition({enableHighAccuracy: true});
    watch.subscribe((data) => {
      this._serv.syncGeolocation(data).then((res)=> {
        this.isSynced = true;
      })
    });
 }

 logout() {
   this.auth.logout();
 }

}
