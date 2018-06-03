import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-event',
  templateUrl: './post-event.component.html',
  styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit {
  event =  {
    title: '',
    categoryId: '',
    place: '',
    date: '',
    description: '' 
    //event_picture: null
  };
  categories: any;
  btnDisabled = false;

  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

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

  
    async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.event)){
       
      
      const data = await this.rest.post(
        'http://localhost:3030/api/events',
        this.event 
      );
      data['success']
      ? this.router.navigate(['/profile/myevents'])
      .then(() => this.data.success(data['message']))
      .catch(error => this.data.error(error))
      : this.data.error(data['message']);
     } 
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  // async edit() {
  //   this.btnDisabled = true;
  //   try {
  //     if (this.event){
       
      
  //     const data = await this.rest.post(
  //       'http://localhost:3030/api/event/:id',
  //       this.event 
  //     );
  //     data['success']
  //     ? this.router.navigate(['/profile/myevents'])
  //     .then(() => this.data.success(data['message']))
  //     .catch(error => this.data.error(error))
  //     : this.data.error(data['message']);
  //    } 
  //   } catch (error) {
  //     this.data.error(error['message']);
  //   }
  //   this.btnDisabled = false;
  // }
  // async delete() {
  //   this.btnDisabled = true;
  //   try {
  //     if (this.event){
       
      
  //     const data = await this.rest.delete(
  //       'http://localhost:3030/api/event/:id' 
  //     );
  //     data['success']
  //     ? this.router.navigate(['/profile/myevents'])
  //     .then(() => this.data.success(data['message']))
  //     .catch(error => this.data.error(error))
  //     : this.data.error(data['message']);
  //    } 
  //   } catch (error) {
  //     this.data.error(error['message']);
  //   }
  //   this.btnDisabled = false;
  // }
}
