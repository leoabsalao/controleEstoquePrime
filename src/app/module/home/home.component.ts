import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  loginCard = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ){}

  // formulario de login
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  // formulario de de criar uma conta
  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmitLoginForm(){
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next:(response)=>{
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
          },
          error:(err)=>console.log(err),
        });
    }
  }

  onSubmitSignupForm(){
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next:(response) => {
            if(response){
              alert('Usuário criado com sucesso!');
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error:(err) => console.log(err),
        });
    }
  }

}
