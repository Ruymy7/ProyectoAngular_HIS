import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInDto } from './dto/log-in-dto';
import { RegisterUserDto } from './dto/register-user-dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn(logInDto: LogInDto): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'auth', logInDto)
  }

  register(registerUserDto: RegisterUserDto): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'register', registerUserDto)
  }
}
