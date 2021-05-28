import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
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
    author: new FormControl(''),
    title: new FormControl(''),
    publishedBefore: new FormControl(''),
    publishedAfter: new FormControl(''),
  });
  
  filterMode = 0;

  constructor(private authService: AuthService, private db: DatabaseService) { }

  ngOnInit(): void {}
  
  publishNews() {
    if (this.authService.user && this.newsData.value.title != '' && this.newsData.value.content != '')
    {
      this.db.insertNews(this.authService.user.id, this.newsData.value.title, this.newsData.value.content);
    }
    else
    {
      alert('Le titre et le contenu sont obligatoire !');
    }
  }
  
  search() {
    switch (this.filterMode)
    {
      case 1:
      {
        break;
      }
      case 2:
      {
        this.db.getNewsByTitle(this.filterData.value.title).then(data =>{
          this.newsList = data;
        });
        break;
      }
      case 3:
      {
        break;
      }
    }
  }
}
