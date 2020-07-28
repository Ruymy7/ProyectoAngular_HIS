import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LogInResponseDto } from '../dto/log-in-response-dto';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string
  password: string

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  logIn() {
    const logInDto = {email: this.email, password: this.password}
    this.authService.logIn(logInDto).subscribe((response: LogInResponseDto) => {
      if(response.status) {
        this.storageService.setCurrentSession(response.data)
        this.router.navigate(['/'])
      }
    })
  }


}
