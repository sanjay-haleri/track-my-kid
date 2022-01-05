import { Injectable } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { getAuth, updateProfile } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  downloadURL: any;
  userShared = new BehaviorSubject<any>(null);
  userData = this.userShared.asObservable();

  constructor(public toastController: ToastController, private auth: AngularFireAuth, private router: Router,private firestore: AngularFirestore, public alertController: AlertController) {

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userShared.next(user);
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    });

    this.auth.authState.subscribe((user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    }));

  }

  async signin(data: any) {
    return await this.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        return res;
      }, (err: any) => {
        return err
      });
  }


  signup(userInfo: any) {
    return this.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        console.log(res);
        
        // res.additionalUserInfo.username = userInfo.userType;
        // this.SendVerificationMail();
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.updateProfile(res.user, userInfo);
          this.insertUserData(res, userInfo)
            .then(() => {
              if(userInfo.userType=='student') {
                this.router.navigate(['request-location']);
              } else {
                this.router.navigate(['/tabs/tab1']);
              }
            });
        }
        return res;
      }, (err: any) => {
        return err
      })
  }

  updateProfile(user, userInfo) {
    updateProfile(user || this.user, {
      displayName: userInfo.userType
    }).then(() => {

    }).catch((error) => {

    });
  }


 async logout() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Are you sure you want to logout??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.auth.signOut();
            localStorage.clear();
            this.router.navigate(['login'])
          }
        }
      ]
    });
    await alert.present();

  }

  insertUserData(userCredential: any, newUser: any) {
    return this.firestore.doc(`Users/${userCredential.user.uid}`).set({
      email: newUser.email,
      userType: newUser.userType,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      lat: '',
      lng: '',
      lastSync: null
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user !== null) ? true : false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  // SendVerificationMail() {
  //   this.auth.currentUser.then((res) => {
  //     if (!res.emailVerified) {
  //       res.sendEmailVerification().then(() => {
  //         this.router.navigate(['/profile/']);
  //       })
  //     }
  //   });
  // }

}
