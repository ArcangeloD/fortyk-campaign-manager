import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-bo-news',
  templateUrl: './bo-news.component.html',
  styleUrls: ['./bo-news.component.css']
})
export class BoNewsComponent implements OnInit {
  
  newsData = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private db: DatabaseService) { }

  ngOnInit(): void {
  }
  
  publishNews() {
    if (this.authService.user)
    {
      this.db.insertNews(this.authService.user.id, this.newsData.value.title, this.newsData.value.content);
    }
  }

}
