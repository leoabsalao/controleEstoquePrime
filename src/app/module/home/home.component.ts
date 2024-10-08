import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
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
            this.router.navigate(['/dashboard']);

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Bem vindo de volta ${response?.name}!`,
              life:2000
            });
          },
          error:(err)=>{
            this.messageService.add({
              severity:'error',
              summary:'Erro',
              detail:`Erro ao fazer login!`,
              life:2000
            });
            console.log(err);
          },
        });
    }
  }

  onSubmitSignupForm(){
    if(this.signupForm.value && this.signupForm.valid){
      this.userService.signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next:(response) => {
            if(response){
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity:'success',
                summary:'Sucesso',
                detail:`Usuário criado com sucesso!`,
                life:2000
              });
            }
          },
          error:(err)=>{
            this.messageService.add({
              severity:'error',
              summary:'Erro',
              detail:`Erro ao criar usuário!`,
              life:2000
            });
            console.log(err);
          },
        });
    }
  }

}
