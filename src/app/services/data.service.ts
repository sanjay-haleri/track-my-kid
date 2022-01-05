import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  childrens: Observable<any[]>;
  user: any;

  constructor(public toastController: ToastController, private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    this.childrens = firestore.collection('Users').snapshotChanges();
    // .pipe(map((doc: any)=> {
    //   console.log(doc);
      
    //   // return {...doc.payload.doc.id, ...doc.payload.doc.data()};
    //   return doc;
    // }));



    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });

    this.auth.authState.subscribe((user => {
      if (user) {
        this.user = user;
      } else {
        localStorage.setItem('user', null);
      }
    }));
  }


 async syncGeolocation(data: any) {
  return  this.auth.currentUser.then((user) => {
     if(user) {
      // this.firestore.collection('Users').doc(user.uid).update({
     return this.firestore.doc(`Users/${user.uid}`).update({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        lastSync: data.timestamp
      })
     }
    });
  }

  getChildById(uid: string) {
    return this.firestore.doc(`Users/${uid}`).valueChanges();
  } 

   getUserData(): Observable<any> {
    return this.firestore.doc(`Users/${this.user.uid}`).valueChanges();
  }
  getChildrenList(): Observable<any> {
    return this.firestore.collection('Users', res => res.where('userType', '==', 'student')).snapshotChanges();
  }

  async updateChildren(data: any) {
    return this.firestore.doc(`Users/${this.user.uid}`).update({
      children: data
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
