import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LogInResponseDto } from '../dto/log-in-response-dto';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  logIn() {
    if(this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe((response: LogInResponseDto) => {
        if(response.status) {
          this.storageService.setCurrentSession(response.data)
          this.router.navigate(['/'])
        }
      })
    }
  }


  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
