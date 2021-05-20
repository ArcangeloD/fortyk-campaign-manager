import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgoten-password-second-step',
  templateUrl: './forgoten-password-second-step.component.html',
  styleUrls: ['./forgoten-password-second-step.component.css']
})
export class ForgotenPasswordSecondStepComponent implements OnInit {

  newPassword = new FormGroup({
    passw: new FormControl('')
  });

  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  sendNewPassword() {
    if (this.authService.session)
    {
      this.authService.updatePassword(this.authService.session.access_token, this.newPassword.value.passw)
    }
  }

}
