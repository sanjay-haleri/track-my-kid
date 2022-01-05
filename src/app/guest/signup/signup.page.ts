import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) { 
    this.buildForm();
  }

  ngOnInit() {

  }

  buildForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userType: ['parent', [Validators.required]], // parent, student, teacher
      lat: [''],
      lng: [''],
      lastSync: [''],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.signupForm.get('email') as FormControl;
  }

  get firstName() {
    return this.signupForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.signupForm.get('lastName') as FormControl;
  }

  get userType() {
    return this.signupForm.get('userType') as FormControl;
  }

  get lat() {
    return this.signupForm.get('lat') as FormControl;
  }

  get lng() {
    return this.signupForm.get('lng') as FormControl;
  }

  get password() {
    return this.signupForm.get('password') as FormControl;
  }
  get lastSync() {
    return this.signupForm.get('lastSync') as FormControl;
  }

  onSubmit() {
    this.signupForm.markAllAsTouched();
    if(this.signupForm.invalid) return;

    this.auth.signup(this.signupForm.value).then((res: any) => {
      if (res.code === 'auth/email-already-in-use') {
       this.auth.presentToast('Email already exist!!');
      }
    }, (err: any) => {
      console.log(err)
    })
  }

}
