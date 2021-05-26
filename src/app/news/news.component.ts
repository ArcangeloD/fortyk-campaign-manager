import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList: any = [];

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getAllNews().then(data => {
      this.newsList = data;
    });
  }

}
