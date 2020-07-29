import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup
  userExisting: boolean = false
  saved: boolean = false
  error: boolean = false
  
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords })
  }

  register() {
    console.log(this.registerForm.hasError('notSamePassword'));
    this.userExisting = false; this.error = false; this.saved = false
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(result => {
        this.saved = true
        setTimeout(() => {
          this.saved = false
          this.router.navigate(['/login'])
        }, 2000)
      }, error => {
        if(error.status === 409) this.userExisting = true
        else this.error = true
      })
    }
  }

  checkPasswords(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value ? null : { notSamePassword: true }
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }

}
