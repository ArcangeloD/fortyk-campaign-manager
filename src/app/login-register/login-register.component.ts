import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  mode = true;
  
  registrationData = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    passw: new FormControl('')
  });
  
  loginData = new FormGroup({
    email: new FormControl(''),
    passw: new FormControl('')
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }
  
  register() {
    this.authService.register(this.registrationData.value.email, this.registrationData.value.passw);
  };
  
  login() {
    this.authService.login(this.loginData.value.email, this.loginData.value.passw);
  }

}
