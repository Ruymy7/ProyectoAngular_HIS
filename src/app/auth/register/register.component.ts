import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  name: string
  email: string
  password: string
  confirmPassword: string

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if(this.password === this.confirmPassword) {
      const registerUserDto = {name: this.name, email: this.email, password: this.password}
      this.authService.register(registerUserDto).subscribe(response => {
        this.router.navigate(['/login'])
      })
    }
    
  }

}
