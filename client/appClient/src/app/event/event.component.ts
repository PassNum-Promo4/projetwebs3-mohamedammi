import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router 
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`http://localhost:3030/api/event/${res['id']}`)
      .then(data => {
        data['success']
          ? (this.event = data['event'])
          : this.router.navigate(['/']);
      }).catch(error => this.data.error(error['message']));
    });
  }

}
