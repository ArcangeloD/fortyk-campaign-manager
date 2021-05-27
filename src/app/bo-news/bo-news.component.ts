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
  
  newsList: any = [];
  
  newsData = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });
  
  filterData = new FormGroup({
    title: new FormControl(''),
    publishedBefore: new FormControl(''),
    publishedAfter: new FormControl(''),
    author: new FormControl('')
  });

  constructor(private authService: AuthService, private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getAllNews().then(data => {
      this.newsList = data;
    });
  }
  
  publishNews() {
    if (this.authService.user)
    {
      this.db.insertNews(this.authService.user.id, this.newsData.value.title, this.newsData.value.content);
    }
  }
  
  filter(){
    if (this.filterData.value.title && this.filterData.value.publishedBefore && this.filterData.value.publishedAfter && this.filterData.value.author)
    {
      alert('full filter');
    }
    else
    {
      alert('no filter');
    }
  }

}
