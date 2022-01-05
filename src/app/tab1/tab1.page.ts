import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddChildPage } from './add-child/add-child.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DataService } from '../services/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  childrenList: Array<String> = [];
  addedChildrenList: Array<any> = [];
  
  childrenListObserv: any;

  constructor(private modalController: ModalController, private geolocation: Geolocation, private _serv: DataService, private auth: AngularFireAuth) {}

  ionViewWillEnter() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this._serv.getUserData().subscribe((res)=> {
          this.childrenList = res.children || [];
          this.getChildrenList();
        });
      }
    });
  }

  ionViewDidLeave() {
    // this.childrenListObserv.unsubscribe();
  }
  
  getChildrenList() {
   this.childrenListObserv = this._serv.getChildrenList().subscribe((resTwo)=> {
      console.log(resTwo);
      this.addedChildrenList = [];
      resTwo.forEach((child) => {
        // console.log(child);
        if(this.childrenList.indexOf(child.payload.doc.id) != -1) {
          let data = { id: child.payload.doc.id, ...child.payload.doc.data()};
          this.addedChildrenList.push(data);
        }
      });
    });
  }

  getMyLocation() {
    let watch = this.geolocation.watchPosition({enableHighAccuracy: true});
    watch.subscribe((data) => {
      this._serv.syncGeolocation(data).then((res)=> {
        // this.isSynced = true;
      })
    });
 }

  async addNewChild() {
    const modal = await this.modalController.create({
      component: AddChildPage,
      cssClass: 'my-custom-class',
      componentProps: {
        childrenList: this.childrenList
      }
    });
    
    return await modal.present();
  }
}
