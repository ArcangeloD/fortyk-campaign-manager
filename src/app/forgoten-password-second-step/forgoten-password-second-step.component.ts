import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-forgoten-password-second-step',
  templateUrl: './forgoten-password-second-step.component.html',
  styleUrls: ['./forgoten-password-second-step.component.css']
})
export class ForgotenPasswordSecondStepComponent implements OnInit {

  newPassword = new FormGroup({
    passw: new FormControl('', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{0,}$')
      ]),
    passwConfirmation: new FormControl('', Validators.required)
  });
  
  resetSubmitted = false;

  constructor(public authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  sendNewPassword() {
    this.resetSubmitted = true;
    if (this.authService.session && !(this.newPassword.controls.passw.errors! || this.newPassword.controls.passwConfirmation.errors!) && this.newPassword.value.passw == this.newPassword.value.passwConfirmation)
    {
      this.authService.updatePassword(this.authService.session.access_token, this.newPassword.value.passw)
    }
  }

}
