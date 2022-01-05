import { Component, OnInit, ElementRef, ViewChild, NgZone  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DataService } from '../services/data.service';

declare var google;

@Component({
  selector: 'app-track-location',
  templateUrl: './track-location.page.html',
  styleUrls: ['./track-location.page.scss'],
})
export class TrackLocationPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;

  myMarker: any;
  childMarker: any;

  childUid: string;
  childObject: any;

  constructor(private geolocation: Geolocation,private _serv: DataService, private _route: ActivatedRoute,private zone: NgZone) {
    this._route.params.subscribe((params)=> {
      this.childUid = params.uid;
    });
    this.getChildrenPlaeholder();
  }

  ngOnInit(): void {}

  getChildrenPlaeholder() {}
  
  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(0, 0);
    let mapOptions = {
      center: latLng,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getMyLocation();
    this.getChildLocation();
 
  }

  getMyLocation() {
  
      this.geolocation.getCurrentPosition().then((coordinates:any)=> {
        this.initMarker(coordinates.coords.latitude, coordinates.coords.longitude, 'parent');
      });
      
      let watch = this.geolocation.watchPosition({enableHighAccuracy: true});
      watch.subscribe((data:any) => {      
        this._serv.syncGeolocation(data).then((res)=> {
         this.initMarker(data.coords.latitude, data.coords.longitude, 'parent');
        })
      });
 }

 getChildLocation() {
   this._serv.getChildById(this.childUid).subscribe((res:any) => {
     this.childObject= res;
      if(!res.lat && !res.lng) {
        this._serv.presentToast('Live location is not available!!');
      } else {
        this.initMarker(res.lat, res.lng, 'child');
      }
   });
 }


 initMarker(lat,lng, type) {
  let latLng = new google.maps.LatLng(lat, lng);
  if(type == 'parent') {
    if(this.myMarker)  this.myMarker.setMap(null);
    
    this.myMarker = new google.maps.Marker({
      position: latLng,
    });
    this.map.setZoom(15);

    this.myMarker.setMap(this.map);
    this.map.panTo(latLng);
  } else {
    
    if(this.childMarker)  this.childMarker.setMap(null);
    this.childMarker = new google.maps.Marker({
      position: latLng,
      icon: {
       url: 'https://firebasestorage.googleapis.com/v0/b/track-my-kid-997cd.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=57bab24e-adf6-4bcb-b117-b0892fa4f749',
       scaledSize: new google.maps.Size(50, 50),
    },
    });
  this.childMarker.setMap(this.map);
  }
 }

 reload() {
   location.reload();
  // this.getMyLocation();
  // this.getChildLocation();
 }
}
