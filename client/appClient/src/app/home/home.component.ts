import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from  '../rest-api.service';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: any;
  constructor(
    private data: DataService,
    private rest: RestApiService
  ) { }

  async ngOnInit() {
    try{
      const data = await this.rest.get('http://localhost:3030/api/events');
      data['success']
        ? (this.events = data['events'])
        : this.data.error(error['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
