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
  selectedNews = 0;
  displayUpdateForm = false;

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
  
  updateNews () {
    if (this.authService.user && this.newsData.value.title != '' && this.newsData.value.content != '')
    {
      this.db.updateNews(this.newsList[this.selectedNews].id, this.newsData.value.title, this.newsData.value.content);
    }
    else
    {
      alert('Le titre et le contenu sont obligatoire !');
    }
  }
  
  deleteNews (){
    this.db.deleteNews(this.newsList[this.selectedNews].id);
    this.search();
    this.displayUpdateForm = false;
  }
  
  selectNews(selected: any) {
    if (!this.displayUpdateForm)
    {
      this.displayUpdateForm = true;
    }
    this.selectedNews = selected;
    this.newsData.controls['title'].setValue(this.newsList[this.selectedNews].title);
    this.newsData.controls['content'].setValue(this.newsList[this.selectedNews].content);
  }
  
  search() {
    switch (this.filterMode)
    {
      case 1:
      {
        this.db.getNewsByAuthor(this.filterData.value.author).then(data =>{
          this.newsList = data;
        });
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
        this.db.getNewsByDate(this.filterData.value.publishedAfter, this.filterData.value.publishedBefore).then(data =>{
          this.newsList = data;
        });
        break;
      }
    }
  }
}
