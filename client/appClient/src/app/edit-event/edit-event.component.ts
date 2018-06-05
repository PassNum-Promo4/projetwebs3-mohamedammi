import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  event: any;
  categories: any;
  btnDisabled = false;
  constructor(private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router) { }

    async ngOnInit() {
      try {
        const data = await this.rest.get(
          "http://localhost:3030/api/categories"
        );
        data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
      } catch (error) {
        this.data.error(error['message']);
      }
    }
    
  validate(event) {
    if(event.title) {
      if(event.categoryId) {
        if(event.place){
          if(event.date){
            if(event.description) {
        
                return true;
              
            } else {
              this.data.error('Please enter description');
            }
          } else {
            this.data.error('Please enter date');            
          }
        } else {
          this.data.error('Please enter place');          
        }
      } else {
        this.data.error('Please select category');
      }
    } else {
      this.data.error('Please enter a title');
    }
  }

  async edit(){
    this.activatedRoute.params.subscribe(res => {
      this.rest.post(`http://localhost:3030/api/event/${res['id']}`, this.validate(event))
      .then(data => {
        data['success']
          ? (this.data.success['message'])
          : this.data.error['message'];
      }).catch(error => this.data.error(error['message']));
    });
  
  }

  async delete(){
    this.activatedRoute.params.subscribe(res => {
      this.rest.delete(`http://localhost:3030/api/event/${res['id']}`)
      .then(data => {
        data['success']
          ? (this.data.success['message'])
          : this.data.error['message'];
      }).catch(error => this.data.error(error['message']));
    });
  }
}

