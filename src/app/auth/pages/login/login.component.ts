import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  myForm: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService:AuthService
      ) { }

  login(){

    const {email, password} = this.myForm.value

    this.authService.login(email, password)
      .subscribe(res => console.log(res)
      )
    // this.router.navigateByUrl('/dashboard')
  }

}
