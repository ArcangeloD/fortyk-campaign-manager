import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeText = '';

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getHomePageText().then(data => {
      this.homeText = data;
    });
  }

}
