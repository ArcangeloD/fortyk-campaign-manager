import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList: any = [];
  lastUpdated = 0;
  min = 0;
  max = 4;
  limit = 5;
  reachedOldest = false;

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getNewsRange(this.min,this.max).then(data => {
      this.newsList = data;
    });
    
    this.db.supabase
      .from('news')
      .on('UPDATE', payload=>{
        this.lastUpdated = payload.new.id;
        var toUpdate = this.newsList.findIndex(this.findNewsIndex, this);
        this.newsList[toUpdate].title = payload.new.title;
        this.newsList[toUpdate].content = payload.new.content;
        this.newsList[toUpdate].updated_at = payload.new.updated_at;
      })
      .subscribe();
      
    this.db.supabase
      .from('news')
      .on('INSERT', payload=>{
        this.db.getUsernameById(payload.new.author_id).then(username => {
          {
            this.newsList.unshift({
              profiles:{username: username},
              title: payload.new.title,
              content: payload.new.content,
              published_at: payload.new.published_at,
              updated_at: payload.new.updated_at
            });
          }
        });
      })
      .subscribe();
      
      this.db.supabase
      .from('news')
      .on('DELETE', payload=>{
        this.lastUpdated = payload.old.id;
        var toRemove = this.newsList.findIndex(this.findNewsIndex, this);
        this.newsList.splice(toRemove, 1);
      })
      .subscribe();
  }
  
  findNewsIndex(news: any) {
    return news.id == this.lastUpdated;
  }
  
  getMoreNews() {
    this.min = this.max+1;
    this.max = this.min+4;
    this.db.getNewsRange(this.min,this.max).then(data => {
      if (data)
      {
        if (data.length < this.limit)
        {
          this.reachedOldest = true;
        }
        if (data.length > 0)
        {
          for(let i = 0; i < data.length; i++)
          {
            this.newsList.push(data[i]);
          }
        }
      }
    });
  }
}
