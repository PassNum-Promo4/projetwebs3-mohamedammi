import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostEventComponent } from './post-event/post-event.component';
import {  MyEventsComponent } from  './my-events/my-events.component';
import { CategoryComponent } from './category/category.component';
import { EventComponent } from './event/event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'categories',
    component:CategoriesComponent
  },
  {
    path: 'categories/:id',
    component: CategoryComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'register', 
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/postevent',
    component: PostEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/editevent',
    component: EditEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/myevents',
    component: MyEventsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
