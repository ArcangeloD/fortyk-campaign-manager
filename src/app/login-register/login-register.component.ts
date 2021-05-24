import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  mode = 1;
  
  registrationData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passw: new FormControl('', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{0,}$')
      ]),
    passwConfirmation : new FormControl('', Validators.required)
  });
  
  registerSubmitted = false;
  userExist = false;
  
  loginData = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    passw: new FormControl('', Validators.required)
  });
  
  loginSubmitted = false;
  
  resetData = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
  });
  
  resetSubmitted = false;

  constructor(private authService: AuthService, private db: DatabaseService) {}

  ngOnInit(): void {}
  
  register() {
    this.registerSubmitted = true;
    if (this.registrationData.valid && this.registrationData.value.passw == this.registrationData.value.passwConfirmation)
    {
      this.authService.register(this.registrationData.value.email, this.registrationData.value.passw)
    }
  };
  
  login() {
    this.loginSubmitted = true;
    if (!(this.loginData.controls.email.errors! || this.loginData.controls.passw.errors))
    {
      this.authService.login(this.loginData.value.email, this.loginData.value.passw);
    }
  };
  
  sendReset() {
    this.resetSubmitted = true;
    if (!this.resetData.controls.email.errors!)
    {
      this.authService.resetPasswordRequest(this.resetData.value.email);
    }
  };
}
