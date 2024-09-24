import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  loginCard = true;

  constructor(private formBuilder: FormBuilder){}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmitLoginForm(){
    console.log('DADOS DO LOGIN FORM',this.loginForm.value);
  }

  onSubmitSignupForm(){
    console.log('DADOS DO SIGNUP FORM',this.signupForm.value);
  }

}
