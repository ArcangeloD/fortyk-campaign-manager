import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  usernameData = new FormGroup({
    username: new FormControl('', 
      [
        Validators.required,
        Validators.minLength(4)
      ])
  });
  
  loaded = false;
  usernameExist = false;
  usernameSubmited = false;
  profileExist = false;

  constructor(private authService: AuthService, private db: DatabaseService) { }

  ngOnInit(): void {
    console.log(this.authService.user);
    this.checkIfProfileExist();
  }
  
  checkIfProfileExist() {
    if (this.authService.user)
    {
      this.db.getProfile(this.authService.user.id)
      .then(data => {
        if (data !== null)
        {
          this.profileExist = true;
          this.usernameData.controls['username'].setValue(data[0].username);
        }
        else
        {
          this.profileExist = false;
        }
        this.loaded = true;
      });
    }
  }
  
  updateUsername() {
    this.usernameSubmited = true;
    if (this.usernameData.valid && this.authService.user)
    {
      this.db.updateUsername(this.authService.user.id, this.usernameData.value.username)
        .then(data => {
          this.checkIfProfileExist();
        });
    }
  };
  
  createProfile() {
    this.usernameSubmited = true;
    if (this.usernameData.valid && this.authService.user)
    {
      this.db.createProfile(this.authService.user.id, this.usernameData.value.username)
        .then(data => {
          this.checkIfProfileExist();
        });
    }
  };
}
