import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from '../../models/interfaces/user/SignupUserResponse';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from '../../models/interfaces/user/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // Criando um usuário
  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse>{
    return this.http.post<SignupUserResponse>(`${this.API_URL}/user`, requestDatas);
  }

  // Autenticando na aplicação
  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  // Verifica se usuário possui um token ou um cookie de validação registrado
  isLoggedIn(): boolean{
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
