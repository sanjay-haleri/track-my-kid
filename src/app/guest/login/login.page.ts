import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;

    this.auth.signin(this.loginForm.value).then((res: any) => {
      if (res.code === 'auth/user-not-found') {
        this.auth.presentToast('User not found...');
      } else
      if (res.code === 'auth/wrong-password') {
        this.auth.presentToast('Wrong password...');
      } else if(res.code === 'auth/invalid-email') {
        this.auth.presentToast('Please use valid email...');
      }

      if (res.user) {
        if(res.user.displayName == 'parent') {
          this.router.navigateByUrl('/tabs/tab1')
        } else {
          this.router.navigateByUrl('/request-location')
        }
      } 

    }, (err: any) => {
      console.log(err)
    })
  }

}
