import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';

import { RestApiService } from './rest-api.service';
import { MessageComponent } from './message/message.component';
import { DataService } from './data.service';
import { AuthGuardService} from './auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostEventComponent } from './post-event/post-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { CategoryComponent } from './category/category.component';
import { EventComponent } from './event/event.component';
import { EditEventComponent } from './edit-event/edit-event.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    CategoriesComponent,
    PostEventComponent,
    MyEventsComponent,
    CategoryComponent,
    EventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule, 
    HttpClientModule
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
